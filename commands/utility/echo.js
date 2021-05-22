module.exports = {
    name: 'echo',
    description: 'Repeats arguments back to you',
    usage: '<args...>',
    args: true,
    execute(message, args) {
        for (arg of args) {
            message.channel.send(arg);
        }
    }
}