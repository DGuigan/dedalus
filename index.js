const fs = require('fs');
const Discord = require('discord.js');
const { client } = require('./config.js');
const { token } = require('./config.json');

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

// scan events folder and set up event listeners
const eventFiles = fs.readdirSync('./events');
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once){
        client.once(event.event, (...args) => event.execute(...args));
    }
    else {
        client.on(event.event, (...args) => event.execute(...args));
    }
}

client.login(token);