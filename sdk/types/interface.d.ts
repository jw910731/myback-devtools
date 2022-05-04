export default class SDKInterface {
    static HTTP_GET: number;
    static HTTP_POST: number;
    static HTTP_PUT: number;
    static HTTP_DELETE: number;
    /**
     * Constructor of interface.
     *
     * @param {string} apiKey the authorized api key.
     * @param {string} endPoint the server endPoint.
     */
    constructor(apiKey: string, endPoint?: string, sdkVersion?: string);
    apiKey: string;
    endPoint: string;
    sdkVersion: string;
    /**
     * API request helper function.
     *
     * @param {number} method must be an integer, please use 'HTTP_XXX' static variable in this class.
     * @param {string} path API Path.
     * @param {object} requestBody Request body payload.
     */
    request(method: number, path: string, requestBody?: object): Promise<import("axios").AxiosResponse<any, any>>;
}
