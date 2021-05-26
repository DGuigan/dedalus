const Discord = require('discord.js');
const { client } = require('./config.js');
const { prefix } = require('./config.json');

/*
* cooldowns collection maps from commands to another
* collection mapping from users to the time command last run
* {commandName -> {user -> time}}
*/
client.cooldowns = new Discord.Collection();

// returns command with corresponding name or alias 
exports.getCommand = (commandName) => {
    return client.commandList.get(commandName) || client.commandList.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 
}

// constructs and returns full usage of a given command
exports.getUsage = (command) => {
    return `${prefix}${command.name} ${command.usage}`;
}

exports.buildEmbed = (title, description, body, inline) => {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(title.toUpperCase())
        .setDescription(description)
        .setFooter('D', client.user.avatarURL())
        .addField('\u200b', '-');
    for (field of body) {
        embed.addField(field[0], field[1], inline);
    }
    return embed;
}

// returns true if message author has required permissions for given command
exports.checkPermissions = (message, command) => {
    const authorPerms = message.channel.permissionsFor(message.author);
    
    if (!command.permissions || authorPerms.has(command.permissions)) {
        return true;
    }
    return false;
}

// returns true if author supplied sufficient arguments
exports.checkArgs = (message, command, args) => {
    if (command.args && !args.length) {
        let reply = `This command requires arguments and you gave it none. Why would you do that, ${message.author}?`;

        if (command.usage) {
            reply += `\nUse it like this: \`${this.getUsage(command)}\``;
        }

        message.channel.send(reply);
        return false;
    }
    return true;
}

exports.checkGuild = (message, command) => {
    if (command.guildOnly && message.channel.type === 'dm') {
        message.reply('It\'s just us here...');
        return false;
    }
    return true;
}

// returns true if message author has remaining cooldown time for command
// sets cooldown time if not
exports.cooldown = (message, command) => {
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
