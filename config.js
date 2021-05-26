const Discord = require('discord.js');

exports.client = new Discord.Client();

exports.christianMode = {
    value: false,
    censored: ['bad', 'fart'],
    toggle: function() {
        this.value = !this.value;
    },
    add: function(word) {
        this.censored.push(word);
    },
    remove: function(word) {
        let i = this.censored.indexOf(word)
        if (i != -1){
            this.censored.splice(i, 1);
            return true;
        }
        return false;
    }
}