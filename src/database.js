const Sequelize = require('sequelize');

module.exports = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: 'database.sqlite',
});
