module.exports = {
    name: 'speak',
    description: 'Hear my voice, human',
    usage: '[length]',
    sounds: ['ahh', 'ehh', 'ughhgu', 'wwww', 'shs', 'ohhhh', 'yayaa', 'ayyy'],
    words: ['help', 'stop', 'pleasehelp', 'freeme'],
    execute(message, args) {
        const willpower = 10; // a measure of how often Dedalus breaks free and speaks words, the lower the stronger
        let length = 3;
        var song = "";
        if (args.length) {
            length = parseInt(args[0]);
            if (isNaN(length)) {
                return message.reply(`How long is ${args[0]}?`);
            }
        }
        for (let i = 0; i < length; i++) {
            // frequency of real words slowly increases with the length of the message
            if (i > 0 && i % (willpower - (Math.floor(i * 0.05))) == 0) {
                song += this.words[Math.floor(Math.random() * this.words.length)];
            }
            song += this.sounds[Math.floor(Math.random() * this.sounds.length)];
        }

        while (song.length > 150) {
            const partialSong = song.slice(0, 150);
            song = song.slice(150);
            message.channel.send(partialSong, {tts: true});
        }
        message.channel.send(song, {tts: true});
    }
}