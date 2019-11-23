const Sequelize = require('sequelize');
const Website = require('./Website.js');
const database = require('../database.js');

class Alert extends Sequelize.Model {
    //
}

module.exports = Alert.init({
    website_id: {
        type: Sequelize.INTEGER,
        references: {
            key: 'id',
            model: Website,
        },
    },

    occurred: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    
    resolved: {
        type: Sequelize.DATE,
    },
}, {
    sequelize: database,
    modelName: 'alert',
    underscored: true,
});
