const menu = require('./views/menu.js');
const settings = require('./settings.js');

let selection = null;

module.exports = async function() {
    // Start rendering infinity loop.
    while (true) {
        // Render view or menu based on selection.
        if (selection) {
            selection = await settings.menu[selection - 1].render();
        } else {
            selection = await menu();
        }
    }
}
