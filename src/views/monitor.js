const chalk = require('chalk');
const Ping = require('../ping.js');
const readline = require('readline');
const Alert = require('../models/Alert.js');
const status = require('./partials/status.js');
const Website = require('../models/Website.js');

let reader;
let longRender;
let shortRender;

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

    // Import settings list.
    const settings = require('../settings.js');

    // Show initial short render.
    status(settings.renders.short.duration);
    requestToReturn(resolve);

    // Start long and short render intervals.
    shortRender = startRender(resolve, settings.renders.short);
    longRender = startRender(resolve, settings.renders.long, () => {
        // Restart short render to prevent overwrite.
        clearInterval(shortRender);
        shortRender = startRender(resolve, settings.renders.short);
    });
}

/**
 * Start render for passed setting.
 */
function startRender(resolve, setting, callback) {
    return setInterval(() => {
        callback && callback();
        status(setting.duration);
        requestToReturn(resolve);
    }, setting.rate * 1000);
}

/**
 * Allow enter to return to menu.
 */
function requestToReturn(resolve) {
    // Create read line interface.
    if (! reader) {
        reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    // Notify user of press enter to return.
    reader.question(chalk.green('Press enter to return to menu! '), () => {
        // Close the reader instance.
        reader.close();

        // Close ping instances.
        instances.forEach(instance => {
            instance.close();
        });

        // Clear render instances.
        clearInterval(longRender);
        clearInterval(shortRender);

        // Resolve promise to return to menu.
        resolve(null);
    });
}
