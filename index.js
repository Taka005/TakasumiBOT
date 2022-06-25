const { Client, Intents } = require('discord.js');
require("dotenv").config();
const cnf = require("./config.json"); 

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.login(process.env.DISCORD_BOT_TOKEN)
   .then(()=> console.info(`\x1b[34m[${h}:${m}:${s}]INFO:ログインに成功しました`))
   .catch(()=> console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:ログインに失敗しました`))

let now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

const events = require("./module/events");
const server = require("./module/web/server");
events(client);
server(client);

//エラー回避
process.on('uncaughtException',async (error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: `+error);

  client.channels.cache.get(cnf.log_channel).send({
    embeds:[{
      color: "RED",
      description: "```"+`${error}`+"```",
      timestamp: new Date()
    }]
  }).catch(()=>{return})
  return;
});

process.on('unhandledRejection',async (error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: `+ error);

  client.channels.cache.get(cnf.log_channel).send({
    embeds:[{
      color: "ORANGE",
      description: "```"+`${error}`+"```",
      timestamp: new Date()
    }]
  }).catch(()=>{return})
  return;
});