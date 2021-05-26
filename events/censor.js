const { christianMode } = require('../config.js');

module.exports = {
    name: 'censor',
    event: 'message',
    execute(message) {
        if (!christianMode.value) return;

        const words = message.content.split(/ +/);
        var wordFound = false;
        for (let i = 0; i < words.length; i++) {
            if (christianMode.censored.includes(words[i])) {
                words[i] = "NONO";
                wordFound = true;
            }
        }

        if (wordFound) {
            message.delete();
            message.channel.send(`What ${message.author} meant to say was\n\t\`${words.join(' ')}\``);
        }
    }
}