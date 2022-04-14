import axios from 'axios';
import SDK from '../src/index';

jest.mock('axios');

test('list sdk resources', () => {
  const sdk = new SDK('API_KEY');
  const sampleResources = [
    {
      id: 1,
      name: 'Resource 1',
    },
    {
      id: 2,
      name: 'Resource 2',
    }
  ];
  const resp = { data: sampleResources };
  axios.get.mockResolvedValue(resp);
  return sdk.getResources().then( ( {data} ) => expect(data).toEqual(sampleResources));
});
