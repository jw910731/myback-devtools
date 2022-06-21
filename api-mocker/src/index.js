import Controller from './controller';

async function fakeServer(req, res) {
  const { url, method } = req;
  const path = url.split('?')[0].split('/').filter((s) => s).join('/');
  switch (true) {
    case (path === 'resource' && method === 'GET'):
      return Controller.getResources(req, res);
    case ((/^resource\/[^/]+$/).test(path) && method === 'GET'):
      return Controller.getCollections(req, res);
    case ((/^resource\/[^/]+\/collection\/[^/]+\/object$/).test(path)):
      switch (method) {
        case 'GET':
          return Controller.getPage(req, res);
        case 'POST':
          return Controller.createObject(req, res);
        case 'PUT':
          return Controller.updateObject(req, res);
        case 'DELETE':
          return Controller.deleteObject(req, res);
        default:
          break;
      }
      break;
    case ((/^resource\/[^/]+\/collection\/[^/]+\/object\/query$/).test(path) && method === 'GET'):
      return Controller.queryObject(req, res);
    default:
      break;
  }
  return null;
}

function mock(middlewares) {
  middlewares.unshift({
    name: 'api-mock-server',
    path: '/api/v1',
    middleware: fakeServer,
  });
}

export {
  mock,
  fakeServer,
};
