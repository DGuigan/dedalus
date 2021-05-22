module.exports = {
    name: 'permissions',
    description: 'Prints permissions of caller or named users',
    aliases: ['perms'],
    usage: '[people...]',
    guildOnly: true,
    execute(message, args) {
        // if no users mentioned default to message author
        // .map is just converting the collection to an array for easy use
        let users = message.mentions.users.size ? message.mentions.users.map(col => col) : [message.author];

        for (user of users) {
            const perms = message.channel.permissionsFor(user).toArray();
            message.channel.send(`Permissions for ${user.username}:\n\t${perms.join(`\n\t`)}\n`);
        }  
    }
}