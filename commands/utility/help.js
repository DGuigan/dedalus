const { prefix } = require('../../config.json');
const utils = require('../../utilities.js');

module.exports = {
    name: 'help',
    description: 'Lists all commands or details about those specified',
    aliases: ['commands'],
    usage: '[command_names...]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commandList } = message.client;

        // if commands given provide further details
        if (args.length) {
            for (commandName of args) {
                const command = utils.getCommand(commandName.toLowerCase());
                if (command) {
                    data.push(`Name: ${command.name}`);
                    data.push(`Description: ${command.description}`);
                    if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
                    if (command.usage) data.push(`Usage: ${utils.getUsage(command)}`);
                    data.push(`Cooldown: ${command.cooldown || 0} second(s)\n`);
                }
                else {
                    data.push(`Sorry, ${commandName} is not a listed command or an alias of one.\n`);
                }
            }
        }
        else {
            data.push('Commands:');
            data.push('\t' + commandList.map(command => command.name).join('\n\t'));
            data.push(`Use \`${utils.getUsage(this)}\` for more info`);
        }
        message.channel.send(data);
    }
}