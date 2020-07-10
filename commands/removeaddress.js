const removeAddress = require('../functions/blockchain/removeAddress');

module.exports = {
    name: 'removeaddress',
    usage: 'removeaddress',
    description: '',
    run: async ({ msg, args }) => {
        const address = args[0];
        const updatedWallet = await removeAddress('ltc', msg.author.username, address);
        msg.reply('command successful');
    },
};
