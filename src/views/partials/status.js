const chalk = require('chalk');
const alerts = require('./alerts.js');
const Sequelize = require('sequelize');
const Website = require('../../models/Website.js');
const Request = require('../../models/Request.js');

module.exports = async function(duration) {
    // Clear the console window.
    console.clear();

    // Render status header and alerts.
    console.log(chalk.blue.bold('——— STATUS ['+duration/60+' MIN] ———\n'));
    await alerts();

    // Fetch all sites from database.
    const sites = await Website.findAll();
    
    // Get starting date for render.
    const date = Date.now() - (duration * 1000);
    
    // Loop through the sites.
    for (let i = 0; i < sites.length; i++) {
        // Get site for index and prepare output.
        const site = sites[i];
        const output = [];

        // Add site information.
        output.push('[' + site.id + ']', site.address);
        output.push('(' + site.interval + ' Seconds)', '\n');

        // Fetch all requests within date.
        const requests = await Request.findAll({
            where: {
                website_id: site.id,
                created_at: {
                    [Sequelize.Op.gte]: date,
                },
            },
        });

        // Prepare metrics variables.
        let delay = 0;
        let uptime = 0;
        let pillars = '';
        let codes = {};

        // Loop through metrics and extract values.
        requests.forEach(request => {
            // Extract basic metrics.
            delay += request.delay;
            uptime += request.online;

            // Add pillar for each request, online = green, red = offline.
            pillars += request.online ? chalk.green('|') : chalk.red('|');

            // Add response code counts.
            if (codes[request.code]) {
                codes[request.code] += 1;
            } else {
                codes[request.code] = 1;
            }
        });

        // Calculate uptime percentage.
        uptime /= requests.length;
        uptime *= 100;

        // Add uptime percentage and pillars to output.
        output.push('Uptime:'.padStart(10), String(Math.round(uptime)).padStart(4) + '%', pillars, '\n');
        
        // Calculate average delay.
        delay /= requests.length;

        // Pretty print status codes.
        let codesText = JSON.stringify(codes)
            .replace(/"/g, '')      // Remove key holders.
            .replace(/:/g, ': ')    // Add space between key and value.
            .replace(/,/g, ', ')    // Add space between codes.
            .replace(/({|})/g, ''); // Remove surrounding brackets.

        // Add delay and response codes to output.
        output.push('Delay:'.padStart(10), String(Math.round(delay)).padStart(4) + 'ms', '\n');
        output.push('Codes:'.padStart(10), ' ' + codesText);

        // Output final text.
        console.log(...output, '\n');
    }
}
