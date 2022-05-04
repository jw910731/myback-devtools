import SDKInterface from '../interface';

export default class ObjectModel extends SDKInterface {

	/**
	 * Constructor of the controller of resource.
	 * 
	 * @param {string} apiKey 
	 * @param {number} resourceId must be an integer.
	 * @param {string} collectionId
	 * @param {object} properties
	 */
	constructor(apiKey, resourceId, collectionId, properties) {
		super(apiKey);
		this.resourceId = resourceId;
		this.collectionId = collectionId;
		this._old_properties = properties;
		this.properties = properties;
	}

	/**
	 * Return the value of the specified attribute.
	 * @param {string} attribute
	 * @return {object} 
	 */
	get(attribute) {
		return this.properties[attribute];
	}

	/**
	 * Update the value the attribute.
	 * @param {string} attribute.
	 * @param {object} newVal.
	 * @return {object}
	 */
	set(attribute, newVal) {
		this.properties[attribute] = newVal;
	}

	/** 
	 * Save the object to the database.
	 */
	async save() {
		const { apiKey, resourceId, collectionId, _old_properties, properties } = this;
		let uri = `/resource/${resourceId}`;
		uri += `/collection/${collectionId}`;
		uri += `/object?match=${JSON.stringify(_old_properties)}`;
		const res = await this.request(SDKInterface.HTTP_PUT, uri, { "data" : properties });
		return new ObjectModel(apiKey, resourceId, collectionId, res.data);
	}

	/** 
	 * Delete the object from the database.
	 */
	async destroy() {
		const { apiKey, resourceId, collectionId, _old_properties } = this;
		let uri = `/resource/${resourceId}`;
		uri += `/collection/${collectionId}`;
		uri += `/object?match=${JSON.stringify(_old_properties)}`;
		const res = await this.request(SDKInterface.HTTP_DELETE, uri);
		delete this.properties;

		return null;
	}

	/**
	 * Return the relation to the specific collection.
	 * @param {string} collectionId
	 * @return {object}
	 */
	 getRelation(collectionId) {
	 	
	 }
}
