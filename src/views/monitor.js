const chalk = require('chalk');
const Ping = require('../ping.js');
const readline = require('readline');
const Alert = require('../models/Alert.js');
const Website = require('../models/Website.js');

const instances = [];

/**
 * Starts ping instances and rendering.
 */
module.exports = async function() {
    return new Promise(async (resolve, reject) => {
        // Find all websites from database.
        const sites = await Website.findAll();
        
        // Start ping instances for each site.
        sites.forEach(site => {
            instances.push(new Ping(site));
        });

        // Render the monitor.
        render(resolve);
    });
}

/**
 * Render the monitoring status.
 */
function render(resolve) {
    // Clear menu text.
    console.clear();

    // Create read line interface.
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Notify user of request to return.
    requestToReturn(reader, resolve);
}

/**
 * Allow enter to return to menu.
 */
function requestToReturn(reader, resolve) {
    // Notify user of press enter to return.
    reader.question(chalk.green('Press enter to return to menu! '), () => {
        // Close the reader instance.
        reader.close();

        // Close ping instances.
        instances.forEach(instance => {
            instance.close();
        });

        // Resolve promise to return to menu.
        resolve(null);
    });
}
