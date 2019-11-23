const request = require('request');
const Sequelize = require('sequelize');
const Alert = require('./models/Alert.js');
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

        // Request site address.
        request(this.site.address, async (error, response) => {
            // Determine response time.
            const delay = Date.now() - start;

            // Get response status code.
            const code = response.statusCode;

            // Determine if valid success code and online.
            const success = code >= 200 && code <= 299;
            const online = error === null && success;

            // Handle alerting based on status.
            await this.alert(online);

            // Add request to database.
            Request.create({ code, delay, online, website_id: this.site.id, created_at: start });
        });
    }

    /**
     * Handle downtime alerting.
     */
    async alert(online) {
        // Import settings.
        const settings = require('./settings.js');

        // Find the latest alert.
        const latest = await Alert.findOne({
            where: {
                website_id: this.site.id,
            },
            order: [
                ['created_at', 'DESC'],
            ],
        });

        // Check if online and has unresolved alert.
        if (latest && ! latest.resolved && online) {
            return latest.update({
                resolved: Date.now(),
            });
        }

        // Check if offline and has no alert or already solved.
        if (! online && (! latest || latest.resolved)) {
            // Find all requests within downtime duration.
            const requests = await Request.findAll({
                where: {
                    website_id: this.site.id,
                    created_at: {
                        [Sequelize.Op.gte]: Date.now() - (settings.down.duration * 1000),
                    },
                },
            });

            // Calculate average uptime.
            let uptime = 0;
            requests.forEach(request => uptime += request.online);
            uptime = (uptime / request.length) * 100;

            // Create alert if above threshold.
            if (uptime <= settings.down.threshold) {
                return Alert.create({
                    website_id: this.site.id,
                    occurred: Date.now(),
                });
            }
        }
    }

    /**
     * Clears the pinging interval.
     */
    close() {
        clearInterval(this.listener);
    }
}
