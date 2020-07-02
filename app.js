const Discord = require("discord.js");
const client = new Discord.Client();

const makeAddress = require("./functions/blockchain/makeAddress");
const makeWallet = require("./functions/blockchain/makeWallet");
const getWallets = require("./functions/blockchain/getWallets");
const getMyWallet = require("./functions/blockchain/getMyWallet");
const getBalance = require("./functions/blockchain/getBalance");

const { tokenDiscord } = require("./config/config");

const PREFIX = "^";
console.log(PREFIX);
let balance = null;

client.login(tokenDiscord);

client.on("ready", () => {
  console.log(`Total balances under moderation .... 0000000`);
});

client.on("message", async (msg) => {
  //   console.log(thing);
  if (msg.content.includes("^balance")) {
    console.log(msg.author.username);
    try {
      //   msg.reply(`***Your balance is: ${balance}***`);
      const { addresses } = await getMyWallet("ltc", msg.author.username);
      console.log(addresses[0]);

      const balance = await getBalance("ltc", addresses[0]);

      msg.reply(JSON.stringify(balance));
    } catch (error) {
      console.error(error);
    }
  }

  if (msg.content.includes("^makeaddress")) {
    try {
      const address = await makeAddress("ltc");
      console.log("address creation in process...");
      msg.reply(
        "***IMPORTANT - next step...*** `^makewallet <name> <address>` "
      );
      console.log(address);
      msg.reply(JSON.stringify(address));
    } catch (error) {
      console.error(error);
    }
  }
  if (msg.content.includes("^wallets")) {
    const wallets = await getWallets("ltc");
    msg.reply(JSON.stringify(wallets));
  }

  if (msg.content.includes("^makewallet")) {
    //collect arguments
    const arr = msg.content.split(" ").slice(1);
    console.log(arr);
    const wallet = await makeWallet("ltc", msg.author.username, arr[0]);

    console.log(wallet);
    msg.reply(JSON.stringify(wallet));
  }

  if (msg.content.includes("^help")) {
    msg.reply(`
      ***HELP PAGE***
        makeaddress - returns new address like {private,public,address,wif}
        makewallet <address> - stores address in wallet name of your Discord username 
      `);
  }
});
