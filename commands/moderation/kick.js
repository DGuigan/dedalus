module.exports = {
    name: 'kick',
    description: 'Removes meddling kids',
    usage: '<user>',
    permissions: ['KICK_MEMBERS'],
    args: true,
    guildOnly: true,
    execute(message, args) {
        message.channel.send("Gonna be real I can't do this yet");
    }
}