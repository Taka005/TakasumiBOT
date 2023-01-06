const { Client, Intents } = require("discord.js");
require("dotenv").config();
const { log_channel } = require("./config.json"); 

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

console.log("\x1b[32m*******************************");
console.log("\x1b[32m          TakasumiBOT          ");
console.log("\x1b[32m    Created By Taka005#6668    ");
console.log("\x1b[32m*******************************");

const events = require("./module/events");
const api = require("./module/api/server");
const gateway = require("./module/global/gateway");
const load = require("./module/events/load");
events(client);
api(client);
gateway(client);
load(client);

client.login(process.env.DISCORD_BOT_TOKEN)
  .then(()=>{
    console.log("\x1b[32mINFO: Login Success");
  })
  .catch(()=>{
    console.log("\x1b[31mERROR: Login Failed");
    process.exit();
  })

//エラー回避
process.on("uncaughtException",async(error)=>{
  console.error(`\x1b[31mERROR: ${error.stack}`);

  client.channels.cache.get(log_channel).send({
    embeds:[{
      color: "RED",
      description: `\`\`\`js\n${error.stack}\`\`\``,
      timestamp: new Date()
    }]
  })
});

process.on("unhandledRejection",async(error)=>{
  console.error(`\x1b[31mERROR: ${error.stack}`);

  client.channels.cache.get(log_channel).send({
    embeds:[{
      color: "ORANGE",
      description: `\`\`\`js\n${error.stack}\`\`\``,
      timestamp: new Date()
    }]
  })
});