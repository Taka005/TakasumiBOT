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

let now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

const events = require("./module/events");
const server = require("./module/web/server");
const gateway = require("./module/global/gateway");
const load = require("./module/events/load");
events(client);
server(client);
gateway();
load(client)

client.login(process.env.DISCORD_BOT_TOKEN)
  .then(()=> console.info(`\x1b[34m[${h}:${m}:${s}]INFO:ログインに成功しました`))
  .catch(()=> console.error(`\x1b[31m[${h}:${m}:${s}]ERROR:ログインに失敗しました`))

//エラー回避
process.on("uncaughtException",async(error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: ${error}`);

  client.channels.cache.get(log_channel).send({
    embeds:[{
      color: "RED",
      description: `\`\`\`${error.path}\`\`\`\n\`\`\`${error}\`\`\``,
      timestamp: new Date()
    }]
  })
});

process.on("unhandledRejection",async(error) => {
  console.error(`\x1b[31m[${h}:${m}:${s}]ERROR: ${error}`);

  client.channels.cache.get(log_channel).send({
    embeds:[{
      color: "ORANGE",
      description: `\`\`\`${error.path}\`\`\`\n\`\`\`${error}\`\`\``,
      timestamp: new Date()
    }]
  })
});

/**
 * 開発・協力
 * Taka005#6668(開発)
 * れのらり#0719(協力)
 * 
 * これらの人々に敬意を表します
 */