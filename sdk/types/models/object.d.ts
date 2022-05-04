export default class ObjectModel extends SDKInterface {
    /**
     * Constructor of the controller of resource.
     *
     * @param {string} apiKey
     * @param {number} resourceId must be an integer.
     * @param {string} collectionId
     * @param {object} properties
     */
    constructor(apiKey: string, resourceId: number, collectionId: string, properties: object);
    resourceId: number;
    collectionId: string;
    _old_properties: any;
    properties: any;
    /**
     * Return the value of the specified attribute.
     * @param {string} attribute
     * @return {object}
     */
    get(attribute: string): object;
    /**
     * Update the value the attribute.
     * @param {string} attribute.
     * @param {object} newVal.
     * @return {object}
     */
    set(attribute: any, newVal: any): object;
    /**
     * Save the object to the database.
     */
    save(): Promise<ObjectModel>;
    /**
     * Delete the object from the database.
     */
    destroy(): Promise<any>;
    /**
     * Return the relation to the specific collection.
     * @param {string} collectionId
     * @return {object}
     */
    getRelation(collectionId: string): object;
}
import SDKInterface from "../interface";
