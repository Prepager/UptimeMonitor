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
        console.log('Ping: ' + this.site.address);
    }

    /**
     * Clears the pinging interval.
     */
    close() {
        clearInterval(this.listener);
    }
}
