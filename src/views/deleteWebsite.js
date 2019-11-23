const chalk = require('chalk');
const Website = require('../models/Website.js');
const readline = require('readline-sync');

module.exports = async function render() {
    // Clear and render header.
    console.clear();
    console.log(chalk.blue.bold('——— DELETE WEBSITE ———'));
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

    // Delete website from database.
    await site.destroy();

    // Return back to menu.
    return null;
}
