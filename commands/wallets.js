const getWallets = require('../functions/blockchain/getWallets');

module.exports = {
    name: 'wallets',
    usage: 'wallets',
    description: '',
    run: async ({ msg }) => {
        const wallets = await getWallets('ltc');
        msg.reply(JSON.stringify(wallets));
    },
};
