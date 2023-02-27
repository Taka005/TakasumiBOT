module.exports = async(message)=>{
  const mysql = require("../lib/mysql");
  const main = require("../../data/global/main.json");
  const fetch = require("node-fetch");
  const { WebhookClient } = require("discord.js");
  require("dotenv").config();
  
  const mute_server = await mysql(`SELECT * FROM mute_server WHERE id = ${message.guild.id} LIMIT 1;`);
  const mute_user = await mysql(`SELECT * FROM mute_user WHERE id = ${message.author.id} LIMIT 1;`);

  const account = await mysql(`SELECT * FROM account WHERE id = ${message.author.id} LIMIT 1;`);

  if(
    !message.channel.type === "GUILD_TEXT"||
    message.author.bot||
    message.content.length > 300||
    !main[message.channel.id]||
    mute_server[0]||
    mute_user[0]||
    !account[0]
  ) return;

  let reference = {
    "channel_id": (message.reference?.channelId || null),
    "guild_id": (message.reference?.guildId || null),
    "message_id": (message.reference?.messageId || null)
  };

  if(message.reference?.messageId&&message.reference?.channelId){
    try{
      const reply_webhooks = new WebhookClient({id: main[message.reference.channelId][0], token: main[message.reference.channelId][1]});
      const msg = await reply_webhooks.fetchMessage(message.reference.messageId);
      reference["message_id"] = msg.embeds[0].image.url.match(/\d{18,19}/g)[0];
    }catch{
      const msg = await message.channel.messages.fetch(message.reference.messageId)
        .catch(()=>{});
      reference["message_id"] = msg.id;
    }
  }

  const content = message.content
    .replace(/(?:https?:\/\/)?(?:discord\.(?:gg|io|me|li)|(?:discord|discordapp)\.com\/invite)\/(\w+)/g,"[招待リンク]")
  
  const cleanContent = message.cleanContent
    .replace(/(?:https?:\/\/)?(?:discord\.(?:gg|io|me|li)|(?:discord|discordapp)\.com\/invite)\/(\w+)/g,"[招待リンク]")

  await fetch("https://ugc.renorari.net/api/v2/messages",{
    "method": "POST",
    "headers":{
      "Authorization": `Bearer ${process.env.UGC_KEY}`,
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(
      {
        "channel":{
          "name": message.channel.name,
          "id": message.channel.id
        },
        "author":{
          "username": message.author.username,
          "discriminator": message.author.discriminator,
          "id": message.author.id,
          "avatarURL": message.author.avatarURL({"dynamic":true,"format":"png","size": 512}),
          "bot": message.author.bot
        },
        "guild":{
          "name": message.guild.name,
          "id": message.guild.id,
          "iconURL": message.guild.iconURL({"dynamic":true,"format":"png","size":256})
        },
        "message":{
          "content": content,
          "id": message.id,
          "clean_content": cleanContent,
          "reference": reference,
          "attachments": message.attachments.map((attachment)=>({
            "name": attachment.name,
            "url": attachment.url,
            "height": attachment.height,
            "width": attachment.width,
            "content_type": attachment.contentType
          })),
          "embeds": message.embeds
        }
      }
    )
  });
}