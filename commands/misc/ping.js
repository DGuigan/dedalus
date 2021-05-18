module.exports = {
    name: 'ping',
    description: 'You say ping, I say pong.',
    execute(message, args) {
        message.channel.send('PONG');
    },
};