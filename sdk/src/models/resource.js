import SDKInterface from '../interface';
import CollectionModel from './collection';

export default class ResourceModel extends SDKInterface {
  /**
   * Constructor of the controller of resource.
   *
   * @param {string} apiKey
   * @param {number} resourceId must be an integer.
   */
  constructor(apiKey, resourceId) {
    super(apiKey);
    this.resourceId = resourceId;
  }

  /**
   * Return the array of collection models in specified resource.
   *
   * @returns {CollectionModel[]}
   */
  async getCollections() {
    const { apiKey, resourceId } = this;
    const res = await this.request(SDKInterface.HTTP_GET, `/resource/${resourceId}`);
    return res.map(({ id }) => new CollectionModel(apiKey, resourceId, id));
  }
}
