module.exports = {
    name: 'purge',
    description: 'Don\'t let them find out.',
    execute(message, args) {
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
    },
};