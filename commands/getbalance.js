const getBalance = require("../functions/blockchain/getBalance");

module.exports = {
  name: "getbalance",
  usage: "getbalance <address>",
  description: "gets the balance of one address",
  run: async ({ msg, args }) => {
    const address = args[0];

    let balance = await getBalance("ltc", address);
    msg.channel.send({
      embed: {
        title: "Balance Card",
        fields: [
          {
            name: "Address",
            value: balance.address,
          },
          {
            name: "Balance",
            value: balance.balance,
          },
        ],
      },
    });
  },
};
