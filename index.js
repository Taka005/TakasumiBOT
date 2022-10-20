const { Client, Intents } = require("discord.js");
require("dotenv").config();
const { log_channel } = require("./config.json"); 

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
});

const events = require("./module/events");
const server = require("./module/web/server");
const gateway = require("./module/global/gateway");
const load = require("./module/events/load");
events(client);
server(client);
gateway(client);
load(client)

client.login(process.env.DISCORD_BOT_TOKEN)
  .then(()=> console.info(`\x1b[34mINFO:ログインに成功しました`))
  .catch(()=> console.error(`\x1b[31mERROR:ログインに失敗しました`))

//エラー回避
process.on("uncaughtException",async(error) =>{
  console.error(`\x1b[31mERROR: ${error.stack}`);

  client.channels.cache.get(log_channel).send({
    embeds:[{
      color: "RED",
      description: `\`\`\`js\n${error.stack}\`\`\``,
      timestamp: new Date()
    }]
  })
});

process.on("unhandledRejection",async(error) =>{
  console.error(`\x1b[31mERROR: ${error.stack}`);

  client.channels.cache.get(log_channel).send({
    embeds:[{
      color: "ORANGE",
      description: `\`\`\`js\n${error.stack}\`\`\``,
      timestamp: new Date()
    }]
  })
});