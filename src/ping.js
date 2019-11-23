const request = require('request');
const Request = require('./models/Request.js');

module.exports = class Ping {
    /**
     * Starts the pinging interval.
     */
    constructor(site) {
        // Save site on instance.
        this.site = site;

        // Run initial ping.
        this.ping();

        // Start pinging interval.
        this.listener = setInterval(() => {
            this.ping();
        }, this.site.interval * 1000);
    }

    /**
     * Handles the ping request.
     */
    ping() {
        // Save starting time.
        const start = Date.now();

        // Make current site available to callback.
        const site = this.site;

        // Request site address.
        request(this.site.address, function (error, response) {
            // Determine response time.
            const delay = Date.now() - start;

            // Get response status code.
            const code = response.statusCode;

            // Determine if valid success code and online.
            const success = code >= 200 && code <= 299;
            const online = error === null && success;

            // Add request to database.
            Request.create({ code, delay, online, website_id: site.id });
        });
    }

    /**
     * Clears the pinging interval.
     */
    close() {
        clearInterval(this.listener);
    }
}
