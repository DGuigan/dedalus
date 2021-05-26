const Discord = require('discord.js');

exports.client = new Discord.Client();

exports.christianMode = {
    value: false,
    censored: ['sus', 'uwu'],
    toggle: function() {
        this.value = !this.value;
    },
    add: function(word) {
        if (!this.censored.includes()) {
            this.censored.push(word);
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
    }
}