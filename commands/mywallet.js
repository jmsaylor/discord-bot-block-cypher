const getOneWallet = require("../functions/blockchain/getOneWallet");

module.exports = {
  name: "mywallet",
  usage: "mywallet",
  description: "Gets the addresses listed in your wallet",
  run: async ({ msg }) => {
    const myWallet = await getOneWallet("ltc", msg.author.username);
    msg.reply(JSON.stringify(myWallet));
  },
};
