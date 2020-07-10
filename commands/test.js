module.exports = {
    name: 'test',
    usage: 'test',
    description: '',
    run: async ({ msg }) => {
        msg.author.send('blip blop bloop');
    },
};
