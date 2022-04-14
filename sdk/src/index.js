import SDKInterface from './interface';
import ResourceModel from './models/resource';
import CollectionModel from './models/collection';

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
	getResources() {
		return this.request(SDKInterface.HTTP_GET, '/resource/');
	}
}
