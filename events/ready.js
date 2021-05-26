const { bot_name} = require('../config.json');

module.exports = {
    name: 'ready',
    event: 'ready',
    once: true,
    execute() {
        console.log(`${bot_name} online`);
    }
}