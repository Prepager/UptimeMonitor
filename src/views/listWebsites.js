const chalk = require('chalk');
const Website = require('../models/Website.js');
const readline = require('readline-sync');

module.exports = async function render() {
    // Clear and render header.
    console.clear();
    console.log(chalk.blue.bold('——— LIST WEBSITES ———'));

    // List existing websites.
    const sites = await Website.findAll();
    sites.forEach(site => {
        console.log(site.id + '. ' + site.address + ', interval = ' + site.interval);
    });

    // Request input to return to menu.
    readline.question(chalk.green('\nPress enter to return to menu! '));
    return null;
}
