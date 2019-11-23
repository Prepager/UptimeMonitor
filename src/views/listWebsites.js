const chalk = require('chalk');
const Website = require('../models/Website.js');
const readline = require('readline-sync');

module.exports = async function render() {
    // Clear and render header.
    console.clear();
    console.log(chalk.blue.bold('——— LIST WEBSITES ———'));

    // List existing websites.
    const websites = await Website.findAll();
    websites.forEach(option => {
        console.log(option.id + '. ' + option.address + ', interval = ' + option.interval);
    });

    // Request input to return to menu.
    readline.question(chalk.green('\nPress enter to return to menu! '));
    return null;
}
