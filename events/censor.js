const christianMode = require('../commands/moderation/censor.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'censor',
    event: 'message',
    execute(message) {
        if (message.content.startsWith(prefix) || !christianMode.value || message.author.bot) return;

        const words = message.content.split(/ +/);
        var wordFound = false;
        for (let i = 0; i < words.length; i++) {
            if (christianMode.censored.includes(words[i].toLowerCase())) {
                words[i] = `**${christianMode.replace(words[i])}**`;
                wordFound = true;
            }
        }
        if (wordFound) {
            message.delete();
            message.channel.send(`What ${message.author} meant to say was\n\t${words.join(' ')}`);
        }
    }
}