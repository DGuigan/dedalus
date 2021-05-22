const Discord = require('discord.js');
const { client } = require('./config.js');
const { prefix } = require('./config.json');

/*
* cooldowns collection maps from commands to another
* collection mapping from users to the time command last run
* {commandName -> {user -> time}}
*/
client.cooldowns = new Discord.Collection();

exports.getCommand = (commandName) => {
    return client.commandList.get(commandName) || client.commandList.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 
}

exports.getUsage = (command) => {
    return `${prefix}${command.name} ${command.usage}`;
}

exports.checkPermissions = (message, command) => {
    const authorPerms = message.channel.permissionsFor(message.author);
    
    if (!command.permissions || authorPerms.has(command.permissions)) {
        return true
    }
    return false
}

exports.cooldown = (command, message) => {
    const { cooldowns } = client;

    // set command in cooldowns if not already set
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now(); // time in ms
    const timestamps = cooldowns.get(command.name); // collection mapping from users to times
    const cooldownAmount = (command.cooldown || 0) * 1000; // convert cooldown time to ms

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        const timeLeft = (expirationTime - now) / 1000;
        message.reply(`Woah there, not so fast cowboy. Wait ${timeLeft.toFixed(1)} more seconds before using \`${command.name}\` again.`);
        return true;     
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    return false;
}
