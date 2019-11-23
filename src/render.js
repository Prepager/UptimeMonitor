const Website = require('./models/Website.js');

module.exports = async function() {
    console.log(await Website.findAll());
}
