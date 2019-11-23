const Sequelize = require('sequelize');
const Website = require('./Website.js');
const database = require('../database.js');

class Request extends Sequelize.Model {
    //
}

module.exports = Request.init({
    website_id: {
        type: Sequelize.INTEGER,
        references: {
            key: 'id',
            model: Website,
        },
    },

    code: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    delay: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    online: {
        type: Sequelize.BOOLEAN,
    },
}, {
    sequelize: database,
    modelName: 'request',
    underscored: true,
});
