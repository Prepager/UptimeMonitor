const chalk = require('chalk');
const Sequelize = require('sequelize');
const Alert = require('../../models/Alert.js');
const Website = require('../../models/Website.js');

module.exports = async function() {
    // Get all recent alerts.
    const alerts = await Alert.findAll();

    // Loop through the alerts.
    for (let i = 0; i < alerts.length; i++) {
        // Find current alert and site.
        const alert = alerts[i];
        const site = await Website.findByPk(alert.website_id);

        // Check if alert was resolved.
        if (alert.resolved) {
            // Output resolved text.
            console.log(chalk.green(
                '[' + site.id + '] ' + site.address + ' was down for ' +
                Math.round((alert.resolved - alert.occurred) / 1000) + ' seconds, ' +
                alert.occurred.toLocaleString() + ' -> ' + alert.resolved.toLocaleString()
            ));
        } else {
            // Output offline text.
            console.log(chalk.red(
                '[' + site.id + '] ' + site.address + ' has been down for ' +
                Math.round((Date.now() - alert.occurred) / 1000) + ' seconds, starting at ' +
                alert.occurred.toLocaleString()
            ));
        }
    }

    // Output last linebreak.
    console.log('');
}
