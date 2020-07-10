const myWallet = require('../functions/blockchain/getMyWallet');

module.exports = {
    name: 'mywallet',
    usage: 'mywallet',
    description: '',
    run: async ({ msg }) => {
        const myWallet = await getMyWallet('ltc', msg.author.username);
        msg.reply(JSON.stringify(myWallet));
    },
};
