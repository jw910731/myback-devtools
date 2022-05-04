import axios from 'axios';
import ObjectModel from '../src/models/object';

jest.mock('axios');

test('object get and set', () => {
  const object = new ObjectModel('API_KEY', 1, 'COLLECTION_ID', {
    'field1' : 1,
    'field2' : 'somevar'
  });
  expect(object.get('field1')).toEqual(1);
  expect(object.get('field2')).toEqual('somevar');
  object.set('field1', 2);
  expect(object.get('field1')).toEqual(2);
});

test('object save', async () => {
  const object = new ObjectModel('API_KEY', 1, 'COLLECTION_ID', {
    'field1' : 1,
    'field2' : 'somevar'
  });
  object.set('field1', 2);

  const resp = { data: object.properties };
  axios.put.mockResolvedValue(resp);

  const newObj = await object.save();
  expect(object.properties).toEqual(newObj.properties);
});


test('object destroy', async () => {
  const object = new ObjectModel('API_KEY', 1, 'COLLECTION_ID', {
    'field1' : 1,
    'field2' : 'somevar'
  });

  axios.delete.mockResolvedValue({});

  const newObj = await object.destroy();
  expect(newObj).toEqual(null);
  expect(object.properties).toEqual(undefined);
});
