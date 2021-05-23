module.exports = {
    name: 'kick',
    description: 'Removes meddling kids',
    usage: '<user>',
    permissions: ['KICK_MEMBERS'],
    args: true,
    guildOnly: true,
    execute(message, args) {
        for (member of message.mentions.members) {
            member[1].kick();
            console.log(member);
            message.reply(`kicked  ${member}`);
        }
    }
}