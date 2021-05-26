const { prefix } = require('../config.json');
const { christianMode } = require('../config.js');
const utils = require('../utilities.js');

module.exports = {
    name: 'command',
    event: 'message',
    execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift();

        const command = utils.getCommand(commandName);

        if (command &&
            utils.checkPermissions(message, command) &&
            utils.checkArgs(message, command, args) &&
            utils.checkGuild(message, command) &&
            !utils.cooldown(message, command)) {
            try {
                command.execute(message, args);
            }
            catch (error) {
                console.error(error);
                message.reply(`Sorry I messed that up, please send an angry email to David.`);
            }
        }
    }
}