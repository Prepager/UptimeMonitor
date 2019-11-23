const assert = require('assert');
const Ping = require('../src/ping.js');
const db = require('../src/database.js');
const Alert = require('../src/models/Alert.js');
const Request = require('../src/models/Request.js');
const Website = require('../src/models/Website.js');

describe('Alerting', () => {
    beforeEach(async () => {
        await db.authenticate();
        await db.sync({ force: true });
    });

    it('Unresolved alerts are resolved when reaching threshold', async () => {
        // Create example site.
        const site = await Website.create({
            address: 'https://example.org',
            interval: 10,
        });

        // Create unresolved alert.
        const alert = await Alert.create({
            website_id: site.id,
            occurred: Date.now() - 1000,
        });

        // Create example request.
        await Request.create({
            website_id: site.id,
            code: 200,
            delay: 60,
            online: 1,
        });

        // Create new pinger instance.
        const ping = new Ping(site);
        ping.close();

        // Check offline value doesn't resolve.
        await ping.alert(false);
        assert.equal((await Alert.findByPk(alert.id)).resolved, null);

        // Check online value does resolve.
        await ping.alert(true);
        assert.notEqual((await Alert.findByPk(alert.id)).resolved, null);
    });

    it('New alerts are created when reaching threshold', async () => {
        // Create example site.
        const site = await Website.create({
            address: 'https://example.org',
            interval: 10,
        });

        // Create example request.
        await Request.create({
            website_id: site.id,
            code: 500,
            delay: 60,
            online: 0,
        });

        // Create new pinger instance.
        const ping = new Ping(site);
        ping.close();

        // Check online value doesn't create.
        await ping.alert(true);
        assert.equal((await Alert.findAll()).length, 0);

        // Check offline value creates single alert.
        await ping.alert(false);
        await ping.alert(false);
        assert.equal((await Alert.findAll()).length, 1);
    });
});
