/*
* Module has typical command properties as well as argMap, substitutions, value, censored, toggle, add and remove
*/

module.exports = {
    name: 'censor',
    description: 'Prevents people using words like "sus" and "UwU"',
    aliases: ['christianMode', 'CM'],
    permissions: ['MANAGE_MESSAGES'],
    args: true,
    argMap: {
        'toggle': 0,
        'state': 1,
        'list': 2,
        'add': 3,
        'remove': 4,
        'reset': 5,
    },
    substitutions: ['NONO', 'REDACTED', 'STOP', 'CEASE', 'PAIN', 'WHY'],
    value: false,
    censored: ['sus', 'uwu'],
    toggle: function() {
        this.value = !this.value;
    },
    add: function(word) {
        if (!this.censored.includes()) {
            this.censored.push(word.toLowerCase());
            return true;
        }
        return false;
    },
    remove: function(word) {
        let i = this.censored.indexOf(word)
        if (i != -1){
            this.censored.splice(i, 1);
            return true;
        }
        return false;
    },
    replace: function(word) {
        return this.substitutions[Math.floor(Math.random() * this.substitutions.length)];
    },
    execute(message, args) {

        switch (this.argMap[args[0].toLowerCase()]) {
            case 0:
                this.toggle();
                return message.reply(`${this.value ? '' : 'de'}activated Christian Mode`);
            case 1:
                return message.channel.send(`Christian Mode is ${this.value ? '' : 'in'}activate`);
            case 2:
                if (this.censored.length > 0) return message.channel.send(`Blasphemous words:\n\t${this.censored.join('\n\t')}`);
                return message.reply("No censored words, it's the wild west out here");
            case 3:
                if (args.length > 1) {
                    for (word of args.slice(1)) {
                        if (this.add(word)) {
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
                        if (this.remove(word)) {
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
            case 5:
                this.censored = [];
                return message.reply('The slate is wiped clean, don\'t sully this chance');
            default:
                return message.reply(`${args[0]} is not a recognised keyword`);
        }
    }
}