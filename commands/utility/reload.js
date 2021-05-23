const fs = require('fs');
const { getCommand } = require('../../utilities.js');

module.exports = {
    name: 'reload',
    description: 'Reloads given commands',
    usage: '<command_names...>',
    args: true,
    execute(message, args) {
        const commandFolders = fs.readdirSync('./commands');
        for (commandName of args) {
            let command = getCommand(commandName);

            if (!command) {
                message.reply(`${commandName} is not a listed command or an alias of one.\n`);
            }
            else {
                let folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`))

                delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

                let newCommand = require(`../${folderName}/${command.name}.js`);
                message.client.commandList.set(newCommand.name, newCommand);
                message.reply(`Command \`${newCommand.name}\` was reloaded.`);
            }            
        }
    }
}