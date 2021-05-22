module.exports = {
    name: 'ping',
    description: 'You say ping, I say pong',
    cooldown: 5,
    execute(message, args) {
        message.channel.send('PONG');
    },
};