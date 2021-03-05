const fetch = require("node-fetch");
const { tokenBlockCypher } = require("../../config/config");

const makeWallet = async (blockchain, name, address) => {
  let info = {
    name: name,
    addresses: [address],
  };

  info = JSON.stringify(info);

  try {
    let wallet = await fetch(
      `https://api.blockcypher.com/v1/${blockchain}/main/wallets?token=${tokenBlockCypher}`,
      {
        method: "POST",
        body: info,
      }
    );
    wallet = await wallet.json();

    return wallet;
  } catch (error) {
    console.error(error);
  }
};

module.exports = makeWallet;
