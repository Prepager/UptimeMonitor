const Sequelize = require('sequelize');
const database = require('../database.js');

class Alert extends Sequelize.Model {
    //
}

module.exports = Alert.init({
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
