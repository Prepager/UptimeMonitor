const monitor = require('./views/monitor.js');
const addWebsite = require('./views/addWebsite.js');
const editWebsite = require('./views/editWebsite.js');
const listWebsites = require('./views/listWebsites.js');
const deleteWebsite = require('./views/deleteWebsite.js');

module.exports = {
    menu: [
        {
            name: 'Start Monitoring',
            render: monitor,
        },
        {
            name: 'List Websites',
            render: listWebsites,
        },
        {
            name: 'Add Website',
            render: addWebsite,
        },
        {
            name: 'Edit Website',
            render: editWebsite,
        },
        {
            name: 'Delete Website',
            render: deleteWebsite,
        },
        {
            name: 'Quit Program',
            render: () => {
                process.exit();
            },
        },
    ],
}
