const Sequelize = require('sequelize');
const database = require('../database.js');

class Request extends Sequelize.Model {
    //
}

module.exports = Request.init({
    code: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    delay: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database,
    modelName: 'request',
    underscored: true,
});
