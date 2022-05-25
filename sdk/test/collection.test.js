import axios from 'axios';
import CollectionModel from '../src/models/collection';

jest.mock('axios');

test('object creation', async () => {
  const sampleObject = {
    field1: 1,
    field2: 'somevar',
  };
  const resp = { data: sampleObject };
  axios.post.mockResolvedValue(resp);

  const sampleCollection = new CollectionModel('API_KEY', 1, 'COLLECTION_ID');
  const res = await sampleCollection.createObject(sampleObject);
  expect(res.properties).toEqual(sampleObject);
});

test('object index', async () => {
  const samplePage = [
    {
      data: {
        field1: 1,
        field2: 'somevar',
      },
    },
    {
      data: {
        field1: 2,
        field2: 'var2',
      },
    },
  ];
  axios.get.mockResolvedValue(samplePage);

  const sampleCollection = new CollectionModel('API_KEY', 1, 'COLLECTION_ID');
  const res = await sampleCollection.getPage();
  for (let i = 0; i < 2; i += 1) {
    expect(res[i].properties).toEqual(samplePage[i].data);
  }
});
