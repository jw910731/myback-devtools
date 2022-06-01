import fs from 'fs';
import { dirname } from 'path';
import { URL } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const host = 'http://localhost:8080/';

function parseReq(req) {
  const url = new URL(req.url, host);
  const segments = url.pathname.split('/');
  return {
    url,
    resourceId: segments[4],
    collectionId: segments[6],
    objectId: segments[8],
  };
}

function getFullPath(path) {
  const appDir = dirname(require.main.filename);
  return appDir + path;
}

function listDataDir(path = '') {
  return fs.readdirSync(getFullPath(`/data/${path}`));
}

async function getDB(req) {
  const { resourceId } = parseReq(req);
  const resource = listDataDir()[resourceId - 1];

  const db = await open({
    filename: getFullPath(`/data/${resource}`),
    driver: sqlite3.Database,
  });
  return db;
}

function whereParser(elements) {
  if (!elements) return '';
  const ref = {
    $lt: '<',
    $lte: '<=',
    $gt: '>',
    $gte: '<=',
    $ne: '!=',
  };
  const whereArray = [];
  Object.entries(elements).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach((v, k) => {
        whereArray.push(`${key}${ref[k]}'${v}'`);
      });
    } else {
      whereArray.push(`${key}='${val}'`);
    }
  });
  const sqlStatement = `WHERE ${whereArray.join(' AND ')}`;
  return sqlStatement;
}

function response(res, obj) {
  res.send(JSON.stringify(obj));
}

export default {
  getResources: async (req, res) => {
    const directories = listDataDir('/');
    response(res, directories.map((dir, idx) => ({ id: idx + 1, name: dir })));
  },
  getCollections: async (req, res) => {
    const db = await getDB(req);
    const result = await db.all("SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'");
    response(res, result.map((row) => ({ id: row.name })));
  },
  getPage: async (req, res) => {
    const { url: reqUrl, collectionId } = parseReq(req);
    const db = await getDB(req);
    const offset = reqUrl.searchParams.get('offset') ?? 0;
    const limit = reqUrl.searchParams.get('limit') ?? 24;

    const result = await db.all(`SELECT * FROM ${collectionId} LIMIT ${limit} OFFSET ${offset}`);
    response(res, result.map((row) => ({ data: row })));
  },
  createObject: async (req, res) => {
    const { collectionId } = parseReq(req);
    const db = await getDB(req);
    const columns = Object.keys(req.body).join(',');
    const values = Object.values(req.body).map((v) => `'${v}'`).join(',');
    await db.run(`INSERT INTO ${collectionId} (${columns}) VALUES (${values})`);
    const result = await db.get(`SELECT * FROM ${collectionId} ${whereParser(req.body)}`);
    response(res, { data: result });
  },
  queryObject: async (req, res) => {
    const { url: reqUrl, collectionId } = parseReq(req);
    const db = await getDB(req);
    const matcher = JSON.parse(reqUrl.searchParams.get('matcher'));
    const result = await db.all(`SELECT * FROM ${collectionId} ${whereParser(matcher)}`);
    response(res, result.map((row) => ({ data: row })));
  },
  updateObject: async (req, res) => {
    const { url: reqUrl, collectionId } = parseReq(req);
    const db = await getDB(req);
    const matcher = JSON.parse(reqUrl.searchParams.get('matcher'));
    const setter = Object.entries(req.body.data).map(([k, v]) => `${k}='${v}'`).join(', ');
    await db.run(`UPDATE ${collectionId} SET ${setter} ${whereParser(matcher)}`);
    const result = await db.get(`SELECT * FROM ${collectionId} ${whereParser(req.body.data)}`);
    response(res, { data: result });
  },
  deleteObject: async (req, res) => {
    const { url: reqUrl, collectionId } = parseReq(req);
    const db = await getDB(req);
    const matcher = JSON.parse(reqUrl.searchParams.get('matcher'));
    await db.run(`DELETE FROM ${collectionId} ${whereParser(matcher)}`);
  },
};
