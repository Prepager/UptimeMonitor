const monitor = require('./views/monitor.js');

module.exports = {
    menu: [
        {
            name: 'Start Monitoring',
            render: monitor,
        },
        {
            name: 'Add Website',
            render: () => { console.log('add'); },
        },
        {
            name: 'Edit Website',
            render: () => { console.log('edit'); },
        },
        {
            name: 'Delete Website',
            render: () => { console.log('delete'); },
        },
        {
            name: 'Quit Program',
            render: () => {
                process.exit();
            },
        },
    ],
}
