var { christianMode } = require('../../config.js');
const argMap = {
    'toggle': 0,
    'state': 1,
    'list': 2,
    'add': 3,
    'remove': 4,
}

module.exports = {
    name: 'censor',
    description: 'Censors specific words in chat',
    aliases: ['christianMode', 'CM'],
    args: true,
    execute(message, args) {

        switch (argMap[args[0].toLowerCase()]) {
            case 0:
                christianMode.toggle();
                return message.reply(`${christianMode.value ? '' : 'de'}activated Christian Mode`);
            case 1:
                return message.channel.send(`Christian Mode is ${christianMode.value ? '' : 'in'}activate`);
            case 2:
                return message.channel.send(`Blasphemous words:\n\t${christianMode.censored.join('\n\t')}`);
            case 3:
                christianMode.add(args[1]);
                return message.reply(`Added ${args[1]} to blacklist`);
            case 4:
                christianMode.remove(args[1]);
                return message.reply(`Removed ${args[1]} from blacklist`);
        }
    }
}