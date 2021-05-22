module.exports = {
    name: 'delete',
    description: 'Don\'t let them find out',
    aliases: ['purge', 'burn'],
    usage: '<int: amount of evidence to burn>',
    guildOnly: true,
    execute(message, args) {
        let toDelete = 3;
        if (args.length) {
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
    },
};