const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('ping:'+`${client.ws.ping}ms`);
}).listen(3000);

const { Client, Intents } = require('discord.js');
require("dotenv").config();
const cnf = require("./config.json")

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
});

let now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

const token = process.env.DISCORD_BOT_TOKEN

const events = require("./module/events")

events(client,token)

client.login(token)
   .then(()=> console.info(`\x1b[34m[${h}:${m}:${s}]INFO:ログインに成功しました`))
   .catch(()=> console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:ログインに失敗しました`))

process.on('uncaughtException', (error) => {


  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: `+error);

  client.channels.cache.get(cnf.log_channel).send({
    embeds:[{
      color: "RED",
      title: `${error.name}`,
      description: "```"+`${error.message}`+"```",
      timestamp: new Date()
    }]
  })
  return;
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: `+`promise[${promise}] reason[${reason.message}]`);

  client.channels.cache.get(cnf.log_channel).send({
    embeds:[{
      color: "RED",
      title: `${promise}`,
      description: "```"+`${reason.message}`+"```",
      timestamp: new Date()
    }]
  })
  return;
});