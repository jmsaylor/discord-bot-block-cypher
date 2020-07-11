// Load Modules
const fs = require("fs");
const Discord = require("discord.js");

// Class Instances
const client = new Discord.Client();
client.cmds = new Discord.Collection();

// Load Commands
fs.readdirSync("./commands").forEach((file) => {
  try {
    let cmd = require(`./commands/${file}`);
    client.cmds.set(cmd.name, cmd);
    console.log(`✔️ Loaded command: ${file}`);
  } catch (error) {
    console.log(`❌ Couldn't load: ${file}`);
    console.error(error);
  }
});

// Configurations
const balance = null;
const prefix = "^";
const { tokenDiscord } = require("./config/config");

// Listen For Messages
client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const cmdName = args.shift().toLowerCase();
  const cmd =
    client.cmds.get(cmdName) ||
    client.cmds.find((c) => c.aliases && c.aliases.includes(cmdName));
  if (!cmd) return;
  try {
    cmd.run({ client, msg, args });
  } catch (error) {
    console.error(error);
  }
});

// Listen For Ready
client.on("ready", () => {
  console.log("Total balances under moderation .... 0000000");
  client.user.setActivity(`listening to ${prefix}info`, {
    type: "STREAMING",
    url: "https://tech-project-mix.netlify.app/",
  });
});

// Login
client.login(tokenDiscord);
