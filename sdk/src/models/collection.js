import SDKInterface from '../interface';
import ObjectModel from './object';

export default class CollectionModel extends SDKInterface {

	/**
	 * Constructor of the controller of resource.
	 * 
	 * @param {string} apiKey 
	 * @param {number} resourceId must be an integer.
	 * @param {string} collectionId
	 */
	constructor(apiKey, resourceId, collectionId) {
		super(apiKey);
		this.resourceId = resourceId;
		this.collectionId = collectionId;
	}

	/**
	 * Return the array of a page in the collection.
	 * 
	 * @param {number} pageId must be an integer. 
	 * @param {number} limit must be an integer. 
	 * @returns {ObjectModel[]}
	 */
	getPage(pageId = 0, limit = 24) {

	}

	/**
	 * Return the newly created object.
	 * 
	 * @param {properties} object the properties for the new object. 
	 * @returns {ObjectModel}
	 */
	 createObject(properties) {
	 	
	 }

	/**
	 * Return the query builder for the collection.
	 * 
	 * @returns {QueryBuilder}
	 */
	getQueryBuilder() {

	}
}
