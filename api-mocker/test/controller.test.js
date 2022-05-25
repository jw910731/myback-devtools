import Controller from '../src/controller';
import MockResponse from './mock-response';

test('get resources', async () => {
  const res = new MockResponse();
  await Controller.getResources({}, res);
  const resources = res.get();
  expect(resources.length).toBe(1);
  expect(resources[0].name).toBe('example');
});

test('get collections', async () => {
  const req = { url: 'api/v1/resource/1' };
  const res = new MockResponse();
  await Controller.getCollections(req, res);
  const collection = res.get();
  expect(collection.length).toBe(1);
  expect(collection[0].id).toBe('one');
});

test('get pages', async () => {
  const req = { url: 'api/v1/resource/1/collection/one/object' };
  const res = new MockResponse();
  await Controller.getPage(req, res);
  const object = res.get();
  expect(object.length).toBeLessThanOrEqual(24);
});

test('create object', async () => {
  const req = {
    url: 'api/v1/resource/1/collection/one/object',
    body: { field1: 1, 2: 'somestr' },
  };
  const res = new MockResponse();
  await Controller.createObject(req, res);
  const record = res.get().data;
  expect(record.field1).toBe(req.body.field1);
  expect(record['2']).toBe(req.body['2']);
});

// API said single??
// test('query object', async () => {
// const req = {
//   url : 'resource/1/collection/one',
//   body: { 'field1' : 1 }
// };
// const res = new MockResponse();
// await Controller.queryObject(req, res);
// });

test('update object', async () => {
  const newObj = { field1: 100, 2: 'a' };
  const req = {
    url: 'api/v1/resource/1/collection/one/object?matcher={"field1":1,"2":"somestr"}',
    body: { data: newObj },
  };
  const res = new MockResponse();
  await Controller.updateObject(req, res);
  const record = res.get().data;
  expect(record.field1).toBe(newObj.field1);
  expect(record['2']).toBe(newObj['2']);
});

test('delete object', async () => {
  const req = {
    url: 'api/v1/resource/1/collection/one/object?matcher={"field1":1,"2":"somestr"}',
  };
  const res = new MockResponse();
  await Controller.deleteObject(req, res);
});
