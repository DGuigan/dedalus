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
    description: 'Prevents people using words like "sus" and "UwU"',
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
                if (args.length > 1) {
                    for (word of args.slice(1)) {
                        if (christianMode.add(word)) {
                            message.reply(`Added **${word}** to blacklist`);
                        }
                        else {
                            message.reply(`**${word}** is already blacklisted`);
                        }
                    }
                }
                else {
                    message.reply('No words supplied');
                }
                break;
            case 4:
                if (args.length > 1) {
                    for (word of args.slice(1)) {
                        if (christianMode.remove(word)) {
                            message.reply(`Removed **${word}** from blacklist`);
                        }
                        else {
                            message.reply(`**${word}** is not a blacklisted word`);
                        }
                    }
                }
                else {
                    message.reply('No words supplied');
                }
                break;
            default:
                return message.reply(`${args[0]} is not a recognised keyword`);
        }
    }
}