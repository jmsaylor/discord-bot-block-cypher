const makeAddress = require('../functions/blockchain/makeAddress');

module.exports = {
    name: 'makeaddress',
    usage: 'makeaddress',
    description: 'creates & DMs you new address {private,public,address,wif}',
    run: async ({ msg }) => {
        const address = await makeAddress('ltc');
        msg.reply('address creation in process...');

        msg.reply('***IMPORTANT - next step...*** `makewallet <name> <address>` ');
        msg.author.send(JSON.stringify(address));
    },
};
