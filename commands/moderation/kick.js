module.exports = {
    name: 'kick',
    description: 'Removes meddling kids.',
    args: true,
    guildOnly: true,
    usage: '<user>',
    execute(message, args) {
        message.channel.send("Gonna be real I can't do this yet");
    }
}