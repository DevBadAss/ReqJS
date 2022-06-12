/**
 * Use Request to interact with servers, files or apis. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing.
 * @author Olawoore Emmanuel Collins
 */
class Request {
    /**
     * @param {Object} param
     * @param {String} param.url request url.
     * @param {String} param.method request method.
     * @param {String} param.res request response type.
     * @param {*} param.data request data.
     */
    constructor({ url, method, res, type, data }) {
        this.request = new XMLHttpRequest();
        this.request.responseType = res;
        this.request.open(method, url, true);
        this.request.setRequestHeader("Content-Type", type);
        this.request.setRequestHeader("Cache-Control", "no-cache");
        if (typeof data === "object") {
            this.data = JSON.stringify(data);
        } else if (typeof data === "string") {
            this.data = data;
        } else {
            this.data = data
        }
        this.method = method;
    }

    /**
     * Executes a POST Request.
     * @param {Object} param
     * @param {Function} param.reject request error callback.
     * @param {Function} param.resolve request success callback.
     */

    push(resolve, reject) {
            if (this.method === "POST") {
                this.request.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        resolve(this.response);
                    }
                    if (this.status === 404) {
                        reject(this.response);
                        return false;
                    }
                }
                this.request.send(this.data);
            }
        }
        /**
         * Executes a GET Request.
         * @param {Object} param
         * @param {Function} param.reject request error callback.
         * @param {Function} param.resolve response callback.
         */

    pull(resolve, reject) {
        if (this.method === "GET") {
            this.request.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(this.response);
                }
                if (this.status === 404) {
                    reject(this.response);
                    return false;
                }
            }
            this.request.send(this.data)
        }
    }

    /**
     * Encodes data
     * @param {String} val data to be encoded
     * @param {Object} param
     * @param {String} param.options  type of val i.e object or string
     * @returns encoded data
     */
    cipher(val, { options }) {
            if (typeof val === "object") {
                if (options === "string") {
                    return encodeURIComponent(JSON.stringify(val));
                }
                if (options === "object") {
                    return encodeURIComponent(val);
                }
            }

            if (typeof val === "string") {
                return encodeURIComponent(val);
            }
        }
        /**
         * Decodes data
         * @param {String} val data to be decoded
         * @param {Object} param
         * @param {String} param.options type of val i.e object or string
         * @returns decoded data
         */
    decipher(val, { options }) {
        const value = decodeURIComponent(val);
        if (typeof value === "object") {
            if (options === "string") {
                return JSON.stringify(value);
            }
            if (options === "object") {
                return value;
            }
        }

        if (typeof val === "string") {
            return decodeURIComponent(val);
        }
    }
}

export default Request;