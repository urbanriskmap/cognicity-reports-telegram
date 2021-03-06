import axios from 'axios';

/**
 * Monitoring class for telegram endpoints
 * @class
 * @param {Object} config - default parameters
 * @return {Object} methods
 */
export default class Monitoring {
    /**
     * constructor for class Monitoring
     * @param {Object} config - Lambda config object
     */
    constructor(config) {
        this.axios = axios;
        this.config = config;
    }

    /**
     * Verify get send endpoint working
     * @function send
     * @return {Promise} - Result of request
     */
    send() {
        const endpoint = this.config.ENDPOINT_SEND;
        return new Promise((resolve, reject) => {
            this.axios.post(endpoint, {body: {}},
                {
                    headers: {
                        'x-api-key': this.config.API_KEY,
                    },
                }
            ).then((response) => {
                reject(new Error(
                    'Expecting 400 response, recieve 200 from ' +
                    endpoint));
                }).catch((err) => {
                // Expecting 400
                if (err.response.data.statusCode === 400) {
                    console.log('Received correct 400 response from ' +
                    endpoint);
                    resolve('Receive correct 400 response from ' +
                    endpoint);
                } else {
                    console.log('Receive incorrect response from ' +
                    endpoint);
                    reject(new Error('Received incorrect response from ' +
                    endpoint));
                }
                console.log(err);
                reject(err); // catch all
            });
        });
    }

    /**
     * Verify get receive webhook endpoint working
     * @function receive
     * @return {Promise} - Result of request
     */
    receive() {
        const endpoint = this.config.ENDPOINT_RECEIVE;
        return new Promise((resolve, reject) => {
            this.axios.post(endpoint, {body: 'string'})
                .then((response) => {
                    resolve('Received correct 200 response from ' + endpoint);
                }).catch((err) => {
                    console.log(err);
                    reject(new Error('Receive incorrect response from ' +
                        endpoint));
                });
        });
    }
}
