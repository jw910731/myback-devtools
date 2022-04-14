import SDKInterface from './interface';
import ResourceModel from './models/resource';

export default class SDK extends SDKInterface {

	/**
	 * Constructor of the controller of resource.
	 * 
	 * @param {string} apiKey 
	 */
	constructor(apiKey) {
		super(apiKey);
	}

	/**
	 * Return the array of resource models.
	 * 
	 * @returns {ResourceModel[]}
	 */
	async getResources() {
		const res = await this.request(SDKInterface.HTTP_GET, '/resource/');
		return res.data.map( ({id}) => new ResourceModel(this.apiKey, id) );
	}
}
