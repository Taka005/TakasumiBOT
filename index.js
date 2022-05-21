const { Client, Intents } = require('discord.js');
const express = require('express');
const app = express();
const os = require("os");
const osutils = require('os-utils');
require("dotenv").config();
const cnf = require("./config.json")

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
});

let now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

const events = require("./module/events")
events(client)

client.login(process.env.DISCORD_BOT_TOKEN)
   .then(()=> console.info(`\x1b[34m[${h}:${m}:${s}]INFO:ログインに成功しました`))
   .catch(()=> console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:ログインに失敗しました`))

//エラー回避
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
      color: "ORANGE",
      title: `${promise}`,
      description: "```"+`${reason.message}`+"```",
      timestamp: new Date()
    }]
  })
  return;
});

//api
app.listen(80);

app.get('/api', (req, res) =>{

  let time = new Date();

  res.json({
    client:{
      user:client.user.tag,
      ping:client.ws.ping,
      uptime:client.uptime()
    },
    system:{
      cpu:osutils.cpuUsage(),
      ram:{   
        total:os.totalmem(),
        free:os.freemem(),
        use:os.totalmem() - os.freemem()
      },
      uptime:os.uptime()
    },
    time:{
      hour:time.getHours(),
      minute:time.getMinutes(),
      second:time.getSeconds()
    }
  });

});
