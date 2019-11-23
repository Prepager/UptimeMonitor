const Alert = require('./Alert.js');
const Request = require('./Request.js');
const Sequelize = require('sequelize');
const database = require('../database.js');

class Website extends Sequelize.Model {
    //
}

module.exports = Website.init({
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    interval: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
    },
}, {
    sequelize: database,
    modelName: 'website',
    underscored: true,
});

Website.hasMany(Alert);
Website.hasMany(Request);
