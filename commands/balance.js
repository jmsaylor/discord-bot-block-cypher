const getOneWallet = require("../functions/blockchain/getOneWallet");
const getBalance = require("../functions/blockchain/getBalance");

module.exports = {
  name: "balance",
  usage: "balance",
  description: "",
  run: async ({ msg }) => {
    //1)Get addresses in wallet
    const { addresses } = await getOneWallet("ltc", msg.author.username);

    if (!addresses) {
      msg.reply("No addresses in your wallet. Add some.");
    } else {
      // const balance = await getBalance("ltc", addresses[0]);
      //2) Loop through address and get balances
      msg.reply("Addresses in your wallet: " + JSON.stringify(addresses));
      //3 Add together
      //4 Send back
      // msg.reply(`Address: ${balance.address}Balance: ${balance.balance}`);
    }
  },
};
