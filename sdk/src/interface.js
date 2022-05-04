import axios from 'axios';

export default class SDKInterface {

	static HTTP_GET = 0;
	static HTTP_POST = 1;
	static HTTP_PUT = 2;
	static HTTP_DELETE = 3;

	/**
	 * Constructor of interface.
	 * 
	 * @param {string} apiKey the authorized api key.
	 * @param {string} endPoint the server endPoint.
	 */
	constructor(apiKey, endPoint = '', sdkVersion = 'v1') {
		this.apiKey = apiKey;
		this.endPoint = endPoint;
		this.sdkVersion = sdkVersion;
	}

	/**
	 * API request helper function. 
	 * 
	 * @param {number} method must be an integer, please use 'HTTP_XXX' static variable in this class.
	 * @param {string} path API Path.
	 * @param {object} requestBody Request body payload.
	 */
	request(method, path,requestBody = {}) {
		switch( method ) {
			case SDKInterface.HTTP_GET:
				return axios.get(`${this.endPoint}/${this.apiKey}/${this.sdkVersion}/${path}`);
			case SDKInterface.HTTP_POST:
				return axios.post(`${this.endPoint}/${this.apiKey}/${this.sdkVersion}/${path}`, requestBody);
			case SDKInterface.HTTP_PUT:
				return axios.put(`${this.endPoint}/${this.apiKey}/${this.sdkVersion}/${path}`, requestBody);
			case SDKInterface.HTTP_DELETE:
				return axios.delete(`${this.endPoint}/${this.apiKey}/${this.sdkVersion}/${path}`);
				break;
			default:
				throw `${method} is not one of the supported method code.`;
		}
	}
}
