module.exports = {
    name: 'echo',
    description: 'Repeats arguments back to you',
    args: true,
    usage: '<args...>',
    execute(message, args) {
        for (arg of args) {
            message.channel.send(arg);
        }
    }
}