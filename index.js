const Discord = require('discord.js');
const { prefix , token} = require('./config.json');

let bot_name = 'Dedalus';

const client = new Discord.Client();

client.once('ready', () => {
    console.log(`${bot_name} online`);

});

client.login(token);

client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'purge') {
            let toDelete = 2;
            if (args.length != 0) {
                toDelete = parseInt(args[0]);
            }
            if (isNaN(toDelete)) {
                return message.reply('A real number please...');
            }
            if (toDelete < 2 || toDelete > 100) {
                return message.reply('Between 2 and 100 please...');
            }
            message.channel.bulkDelete(toDelete);
            message.reply('Nobody will ever know...');
        }
});