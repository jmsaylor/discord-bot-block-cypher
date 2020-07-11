const addAddress = require('../functions/blockchain/addAddress');

module.exports = {
    name: 'addaddress',
    usage: 'addaddress <address>',
    description: 'add address to a wallet',
    run: async ({ msg, args }) => {
        //not working yet - supposed to be able to add new addresses to your wallet but keep getting
        //an erroneous server error (Max Limits reached)
        const address = args[0];
        const updatedWallet = await addAddress('ltc', address, msg.author.username);
        msg.reply(JSON.stringify(updatedWallet));
    },
};
