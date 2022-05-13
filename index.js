const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('ping:'+`${client.ws.ping}ms`);
}).listen(3000);

const { Client, Intents } = require('discord.js');
require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
});

var now = new Date();
var h = now.getHours()
var m = now.getMinutes()
var s = now.getSeconds() 

const events = require("./module/events")

events(client)

client.login(process.env.DISCORD_BOT_TOKEN)
   .then(()=> console.info(`\x1b[34m[${h}:${m}:${s}]INFO:ログインに成功しました`))
   .catch(()=> console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:ログインに失敗しました`))

process.on('uncaughtException', (error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:`+error);
});

process.on('unhandledRejection', (error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:`+error);
});