const http = require('http');//http repuest
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('ping:'+`${client.ws.ping}ms`);
}).listen(3000);

const { Client, Intents } = require('discord.js');
require("dotenv").config();

const options = {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
};
const client = new Client(options);

const ready = require('./events/ready.js');
const messageCreate = require('./events/messageCreate.js')
const interactionCreate = require('./events/interactionCreate.js')
const guildMemerAdd = require('./events/guildMemberAdd');
const guildMemberRemove = require('./events/guildMemberRemove.js')

const bump = require('./commands/bump');
const note = require('./commands/note');
const node = require('./commands/node.js');

//events
ready(client) 

messageCreate(client)

interactionCreate(client)

guildMemerAdd(client)

guildMemberRemove(client)

//commands
bump(client)

note(client)

node(client)

client.login(process.env.DISCORD_BOT_TOKEN)
   .then(()=> console.log("[${h}:${m}:${s}]CLIENT:ログインに成功しました"))
   .catch(e => console.log("[${h}:${m}:${s}]ERROR:ログインに失敗しました"))

/**
 * development by Taka005#1203
 *
 * please join the my discord server
 * https://discord.gg/GPs3npB63m
 */