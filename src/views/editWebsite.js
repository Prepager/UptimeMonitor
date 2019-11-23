const chalk = require('chalk');
const Website = require('../models/Website.js');
const readline = require('readline-sync');

module.exports = async function render() {
    // Clear and render header.
    console.clear();
    console.log(chalk.blue.bold('——— EDIT WEBSITE ———'));
    console.log('0. Return to menu.');

    // List existing websites.
    const sites = await Website.findAll();
    sites.forEach(site => {
        console.log(site.id + '. ' + site.address + ', interval = ' + site.interval);
    });

    // Request selection and parse to int.
    const answer = parseInt(readline.question(chalk.green('\nSelect > ')));

    // Check if attempting to quit.
    if (answer === 0) {
        return null;
    }

    // Re-render if selection doesn't exists.
    const site = sites.find(site => site.id === answer);
    if (! site) {
        return await render(menu);
    }
    
    // Request new data from user.
    const address = await requestAddress(site);
    const interval = await requestInterval(site);

    // Update existing website in database.
    await site.update({ address, interval });

    // Return back to menu.
    return null;
}

/**
 * Request website address for selected.
 */
async function requestAddress(website) {
    // Request website address from user or default.
    const value = readline.question(chalk.green('Website address (including http/https) ['+website.address+'] > ')) || website.address;

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
 * Request website interval for selected.
 */
async function requestInterval(website) {
    // Request website interval from user or default.
    const value = readline.question(chalk.green('Website interval (seconds) ['+website.interval+'] > ')) || website.interval;

    // Check if valid int.
    if (! parseInt(value)) {
        console.log(chalk.red.bold('Invalid number!'));
        return await requestInterval();
    }

    // Return the valid interval.
    return value;
}
