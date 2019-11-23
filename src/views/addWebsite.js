const chalk = require('chalk');
const readline = require('readline-sync');
const Website = require('../models/Website.js');

module.exports = async function() {
    // Clear and render header.
    console.clear();
    console.log(chalk.blue.bold('——— ADD WEBSITE ———'));

    // Request data from user.
    const address = await requestAddress();
    const interval = await requestInterval();

    // Add new website to database.
    await Website.create({ address, interval });

    // Return back to menu.
    return null;
}

/**
 * Request website address.
 */
async function requestAddress() {
    // Request website address from user.
    const value = readline.question(chalk.green('Website address (including http/https) > '));

    // Validate the passed address.
    try {
        new URL(value);
    } catch(error) {
        console.log(chalk.red.bold('Invalid address!'));
        return await requestAddress();
    }

    // Return the valid address.
    return value;
}

/**
 * Request site interval.
 */
async function requestInterval() {
    // Request site interval from user.
    const value = readline.question(chalk.green('Site interval (seconds) > '));

    // Check if valid int.
    if (! parseInt(value)) {
        console.log(chalk.red.bold('Invalid number!'));
        return await requestInterval();
    }

    // Return the valid interval.
    return value;
}
