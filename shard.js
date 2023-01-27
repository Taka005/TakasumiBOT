const { ShardingManager } = require("discord.js");
require("dotenv").config();

const manager = new ShardingManager("./index.js",{ token: process.env.DISCORD_BOT_TOKEN });

manager.on("shardCreate",(shard)=>{
    console.log(`\x1b[34mINFO: Shard ${shard.id}`)
});

manager.spawn();