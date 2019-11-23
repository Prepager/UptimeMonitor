const chalk = require('chalk');
const readline = require('readline-sync');
const settings = require('../settings.js');

module.exports = async function render() {
    // Clear the console window.
    console.clear();

    // List all menu options.
    console.log(chalk.blue.bold('——— MENU ———'));
    settings.menu.forEach((option, index) => {
        console.log((index + 1) + '. ' + option.name);
    });

    // Request selection and parse to int.
    const answer = parseInt(readline.question(chalk.green('\nSelect > ')));

    // Re-render if selection outside range.
    if (! answer || answer < 1 || answer > settings.menu.length) {
        return await render();
    }

    // Return the valid selection.
    return answer;
}
