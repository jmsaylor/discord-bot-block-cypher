const makeWallet = require('../functions/blockchain/makeWallet');

module.exports = {
    name: 'makewallet',
    usage: 'makewallet <address>',
    description: 'stores address in wallet name of your Discord username',
    run: async ({ msg, args }) => {
        //collect arguments
        console.log(args[0]);
        const wallet = await makeWallet('ltc', msg.author.username, args[0]);

        console.log(wallet);
        msg.reply(JSON.stringify(wallet));
    },
};
