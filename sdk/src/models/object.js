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
	save() {

	}

	/** 
	 * Delete the object from the database.
	 */
	destroy() {

	}
}
