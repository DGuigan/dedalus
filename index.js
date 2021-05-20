const fs = require('fs');
const Discord = require('discord.js');
const { client } = require('./config.js');
const { cooldown } = require('./cooldown.js');
const { prefix , token} = require('./config.json');
const { getCommand, getUsage } = require('./utilities.js');

let bot_name = 'Dedalus';

client.commandList = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`);
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commandList.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log(`${bot_name} online`);
});

client.login(token);

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = getCommand(commandName);

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('It\'s just us here...');
    }

    if (command.args && !args.length) {
        let reply = `This command requires arguments and you gave it none. Why would you do that, ${message.author}?`;

        if (command.usage) {
            reply += `\nUse it like this: \`${getUsage(command)}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldown(command, message)) {
        try {
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply(`Sorry I messed that up, please send an angry email to David.`);
        }
    }
});