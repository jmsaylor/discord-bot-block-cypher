const Discord = require("discord.js");
const client = new Discord.Client();

const makeAddress = require("./functions/blockchain/makeAddress");
const makeWallet = require("./functions/blockchain/makeWallet");
const getWallets = require("./functions/blockchain/getWallets");
const getMyWallet = require("./functions/blockchain/getMyWallet");
const getBalance = require("./functions/blockchain/getBalance");
const addAddress = require("./functions/blockchain/addAddress");
const removeAddress = require("./functions/blockchain/removeAddress");

const { tokenDiscord } = require("./config/config");

const PREFIX = "^";
console.log(PREFIX);
let balance = null;

client.login(tokenDiscord);

client.on("ready", () => {
  console.log(`Total balances under moderation .... 0000000`);
  client.user.setActivity("listening to ^info", {
    type: "STREAMING",
    url: "https://tech-project-mix.netlify.app/",
  });
});

client.on("message", async (msg) => {
  if (msg.content.includes("^test")) {
    msg.author.send("blip blop bloop");
  }
  if (msg.content.includes("^balance")) {
    console.log(msg.author.username);
    try {
      //   msg.reply(`***Your balance is: ${balance}***`);
      const { addresses } = await getMyWallet("ltc", msg.author.username);
      console.log(addresses[0]);

      const balance = await getBalance("ltc", addresses[0]);

      msg.reply("Addresses in your wallet: " + JSON.stringify(addresses));

      msg.reply(`
        Address: ${balance.address}
        Balance: ${balance.balance}
      `);
    } catch (error) {
      console.error(error);
    }
  }

  if (msg.content.includes("^makeaddress")) {
    try {
      const address = await makeAddress("ltc");
      msg.reply("address creation in process...");

      msg.reply(
        "***IMPORTANT - next step...*** `makewallet <name> <address>` "
      );
      msg.author.send(JSON.stringify(address));
    } catch (error) {
      console.error(error);
    }
  }
  if (msg.content.includes("^wallets")) {
    const wallets = await getWallets("ltc");
    msg.reply(JSON.stringify(wallets));
  }
  if (msg.content.includes("^mywallet")) {
    const myWallet = await getMyWallet("ltc", msg.author.username);
    msg.reply(JSON.stringify(myWallet));
  }

  if (msg.content.includes("^makewallet")) {
    //collect arguments
    const arr = msg.content.split(" ").slice(1);
    console.log(arr);
    const wallet = await makeWallet("ltc", msg.author.username, arr[0]);

    console.log(wallet);
    msg.reply(JSON.stringify(wallet));
  }

  if (msg.content.includes("^addaddress")) {
    //not working yet - supposed to be able to add new addresses to your wallet but keep getting
    //an erroneous server error (Max Limits reached)
    const arr = msg.content.split(" ").slice(1);
    const address = arr[0];
    const updatedWallet = await addAddress("ltc", address, msg.author.username);
    msg.reply(JSON.stringify(updatedWallet));
  }

  if (msg.content.includes("^removeaddress")) {
    const arr = msg.content.split(" ").slice(1);
    const address = arr[0];
    try {
      const updatedWallet = await removeAddress(
        "ltc",
        msg.author.username,
        address
      );
      msg.reply("command successful");
    } catch (error) {
      console.log(error);
    }
  }

  if (msg.content.includes("^mention")) {
    // console.log(typeof msg.mentions.users);
    // msg.reply(typeof msg.mentions);
  }

  if (msg.content.includes("^transact")) {
    //Sender
    const sender = msg.author.username;
    console.log(`Sender: ${sender}`);
    //Amount
    let arr = msg.content.split(" ").slice(1);

    const amount = arr[0];
    console.log(`Amount: ${amount}`);

    //Recepient
    msg.mentions.users.forEach((user) => {
      console.log(`Recepient: ${user.username}`);
    });
  }

  if (msg.content.includes("^help") || msg.content.includes("^info")) {
    msg.reply(`
        ***HELP PAGE***

        _IMPORTANT_ DON'T USE THESE WALLETS YET - ONLY FOR TESTING PURPOSES

        help - this page
        makeaddress - creates & DMs you new address {private,public,address,wif}
        makewallet <address> - stores address in wallet name of your Discord username
        addaddress <address> - add address to a wallet
        wallets - list all wallets
        balance - show my balance
      `);
  }
});
