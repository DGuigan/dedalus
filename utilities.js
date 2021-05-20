const { client } = require('./config.js');
const { prefix } = require('./config.json');

exports.getCommand = (commandName) => {
    return client.commandList.get(commandName) || client.commandList.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 
}

exports.getUsage = (command) => {
    return `${prefix}${command.name} ${command.usage}`;
}
