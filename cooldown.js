const Discord = require('discord.js');
const { client } = require('./config.js');

client.cooldowns = new Discord.Collection();

exports.cooldown = (command, message) => {
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        const timeLeft = (expirationTime - now) / 1000;
        message.reply(`Woah, not so fast cowboy. Please wait ${timeLeft.toFixed(1)} more seconds before using \`${command.name}\` again.`);
        return true;     
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    return false;
}
