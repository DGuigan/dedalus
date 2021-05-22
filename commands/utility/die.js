module.exports = {
    name: 'die',
    description: 'Actually kills the Dedalus (Don\'t worry we have more)',
    execute(message, args) {
        process.exit();
    }
}