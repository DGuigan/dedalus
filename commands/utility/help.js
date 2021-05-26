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

        // if commands given provide further details
        if (args.length) {
            for (commandName of args) {
                const command = utils.getCommand(commandName.toLowerCase());
                if (command) {
                    const fields = [];
                    fields.push(['Name:', `${command.name}`]);
                    fields.push(['Description:', `${command.description}`]);
                    if (command.aliases) fields.push(['Aliases:', `${command.aliases.join(', ')}`]);
                    if (command.usage) fields.push(['Usage:', `${utils.getUsage(command)}`]);
                    fields.push(['Cooldown:', `${command.cooldown || 0} second(s)\n`]);
                    const response = utils.buildEmbed(command.name, `Info on the ${command.name} command`, fields, false);
                    message.channel.send(response);

                }
                else {
                    message.reply(`Sorry, ${commandName} is not a listed command or an alias of one.\n`);
                }
            }
        }
        else {
            const fields = [];
            for (command of message.client.commandList) {
                fields.push([command[1].name, '   ' + command[1].description]);
            }
            const response = utils.buildEmbed('Commands', `Use \`${utils.getUsage(this)}\` for more info`, fields, true);
            return message.channel.send(response);
        }
    }
}