const chalk = require('chalk');
const Website = require('../models/Website.js');
const readline = require('readline-sync');

module.exports = async function render() {
    // Clear and render header.
    console.clear();
    console.log(chalk.blue.bold('——— DELETE WEBSITE ———'));
    console.log('0. Return to menu.');

    // List existing websites.
    const websites = await Website.findAll();
    websites.forEach(option => {
        console.log((option.id) + '. ' + option.address + ', interval = ' + option.interval);
    });

    // Request selection and parse to int.
    const answer = parseInt(readline.question(chalk.green('\nSelect > ')));

    // Check if attempting to quit.
    if (answer === 0) {
        return null;
    }

    // Re-render if selection doesn't exists.
    const website = websites.find(website => website.id === answer);
    if (! website) {
        return await render(menu);
    }

    // Delete website from database.
    await website.destroy();

    // Return back to menu.
    return null;
}
