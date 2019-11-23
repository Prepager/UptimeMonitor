const Sequelize = require('sequelize');

module.exports = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: process.env.NODE_ENV === 'testing'
        ? ':memory:'
        : 'database.sqlite',
});
