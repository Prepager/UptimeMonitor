const Ping = require('../ping.js');
const Alert = require('../models/Alert.js');
const Website = require('../models/Website.js');

module.exports = async function() {
    // Find all websites from database.
    const sites = await Website.findAll();
    
    // Start ping instances for each site.
    const instances = [];
    sites.forEach(site => {
        instances.push(new Ping(site));
    });
}
