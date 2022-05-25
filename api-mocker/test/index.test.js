import APIMocker from '../src/index';
import MockResponse from './mock-response';

test('mocking', () => {
  const middlewares = [];
  APIMocker.mock(middlewares);
  expect(middlewares[0].name).toBe('api-mock-server');
  expect(middlewares[0].path).toBe('/api/v1');
});

test('server routing - resource index', async () => {
  const res = new MockResponse();
  await APIMocker.fakeServer({
    url: '/api/v1/resource/',
    method: 'GET',
  }, res);
  const resources = res.get();
  expect(resources.length).toBe(1);
  expect(resources[0].name).toBe('example');
});

test('server routing - collection index', async () => {
  const res = new MockResponse();
  await APIMocker.fakeServer({
    url: '/api/v1/resource/1',
    method: 'GET',
  }, res);
  const collection = res.get();
  expect(collection.length).toBe(1);
  expect(collection[0].id).toBe('one');
});

test('server routing - get object page', async () => {
  const res = new MockResponse();
  await APIMocker.fakeServer({
    url: '/api/v1/resource/1/collection/one/object',
    method: 'GET',
  }, res);
  const object = res.get();
  expect(object.length).toBeLessThanOrEqual(24);
});

test('server routing - create object', async () => {
  const res = new MockResponse();
  await APIMocker.fakeServer({
    url: '/api/v1/resource/1/collection/one/object',
    method: 'POST',
    body: { field1: 1, 2: 'somestr' },
  }, res);
  const record = res.get().data;
  expect(record.field1).toBe(1);
  expect(record['2']).toBe('somestr');
});

test('server routing - update object', async () => {
  const res = new MockResponse();
  await APIMocker.fakeServer({
    url: '/api/v1/resource/1/collection/one/object?matcher={"field1":1,"2":"somestr"}',
    method: 'PUT',
    body: { data: { field1: 100, 2: 'a' } },
  }, res);
  const record = res.get().data;
  expect(record.field1).toBe(100);
  expect(record['2']).toBe('a');
});

test('server routing - delete object', async () => {
  const res = new MockResponse();
  await APIMocker.fakeServer({
    url: '/api/v1/resource/1/collection/one/object?matcher={"field1":1,"2":"somestr"}',
    method: 'DELETE',
  }, res);
});
