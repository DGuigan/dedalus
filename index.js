const fs = require('fs');
const Discord = require('discord.js');
const { client } = require('./config.js');
const { prefix, token, bot_name} = require('./config.json');
const utils = require('./utilities.js');

client.commandList = new Discord.Collection();

// scan commands folder and build collection of commands 
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
});