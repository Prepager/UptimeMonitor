const db = require('./src/database.js');
const render = require('./src/render.js');

/**
 * Initialize database and start application.
 */
(async function main() {
    // Attempt to initialize database.
    try {
        await db.authenticate();
        await db.sync();
    } catch (error) {
        console.error('Unable to initialize database:', error);
        process.exit(1);
    }

    // Render application.
    await render();
})();
