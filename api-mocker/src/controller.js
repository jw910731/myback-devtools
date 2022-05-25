import fs from 'fs';
import { dirname } from 'path';
import { URL } from 'url';
import Datastore from '@dills1220/nedb';

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

function getDB(req) {
  const { resourceId, collectionId } = parseReq(req);
  const resource = listDataDir()[resourceId - 1];
  const db = new Datastore({
    filename: getFullPath(`/data/${resource}/${collectionId}`),
    autoload: true,
  });
  return db;
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
    const { resourceId } = parseReq(req);
    const resource = listDataDir()[resourceId - 1];
    const filenames = listDataDir(resource);
    response(res, filenames.map((file) => ({ id: file })));
  },
  getPage: async (req, res) => {
    const { url: reqUrl } = parseReq(req);
    const db = getDB(req);
    const offset = reqUrl.searchParams.get('offset') ?? 0;
    const limit = reqUrl.searchParams.get('limit') ?? 24;

    await new Promise((resolve) => {
      db.find({}).skip(offset).limit(limit).exec((err, docs) => {
        response(res, docs.map((doc) => ({ data: doc })));
        resolve('Success!');
      });
    });
  },
  createObject: async (req, res) => {
    const db = getDB(req);
    await new Promise((resolve) => {
      db.insert(req.body, (err, newDoc) => {
        response(res, { data: newDoc });
        resolve('Success!');
      });
    });
  },
  queryObject: async (req, res) => {
  },
  updateObject: async (req, res) => {
    const db = getDB(req);
    const reqUrl = new URL(req.url, host);
    const matcher = JSON.parse(reqUrl.searchParams.get('matcher'));
    const newObj = req.body.data;
    await new Promise((resolve) => {
      db.update(matcher, newObj, {}, () => {
        db.find(newObj).exec((err, docs) => {
          response(res, { data: docs[0] });
          resolve('Success!');
        });
      });
    });
  },
  deleteObject: async (req, res) => {
    const db = getDB(req);
    const reqUrl = new URL(req.url, host);
    const matcher = JSON.parse(reqUrl.searchParams.get('matcher'));
    await new Promise((resolve) => {
      db.remove(matcher, {}, () => {
        resolve('Success!');
      });
    });
  },
};
