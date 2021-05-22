module.exports = {
    name: 'permissions',
    description: 'Prints permissions of caller or named users',
    aliases: ['perms'],
    usage: '[people...]',
    guildOnly: true,
    execute(message, args) {

        if (message.mentions.users.size) {
            for (user of message.mentions.users) {
                let i = 1;
                const perms = message.channel.permissionsFor(user[1]).toArray();
                message.channel.send(`${user[1].username}'s permissions:\n\t${perms.join(`\n\t`)}`);
            }
        }
        else {
            const perms = message.channel.permissionsFor(message.author).toArray();
            message.channel.send(`Your permissions:\n\t${perms.join('\n\t')}`);
        }        
    }
}