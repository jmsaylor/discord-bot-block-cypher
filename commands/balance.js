const getMyWallet = require('../functions/blockchain/getMyWallet');

module.exports = {
    name: 'balance',
    usage: 'balance',
    description: '',
    run: async ({ msg }) => {
        console.log(msg.author.username);
        //   msg.reply(`***Your balance is: ${balance}***`);
        const { addresses } = await getMyWallet('ltc', msg.author.username);
        console.log(addresses[0]);

        const balance = await getBalance('ltc', addresses[0]);

        msg.reply('Addresses in your wallet: ' + JSON.stringify(addresses));

        msg.reply(`Address: ${balance.address}Balance: ${balance.balance}`);
    },
};
