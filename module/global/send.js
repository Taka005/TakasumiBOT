module.exports = async(message)=>{
  const mute_user = require("../../data/block_user.json");
  const mute_server = require("../../data/block_server.json");
  const main = require("../../data/global/main.json");
  const fetch = require("node-fetch");
  const { WebhookClient } = require("discord.js");
  require("dotenv").config();
  
  if(
    !message.channel.type === "GUILD_TEXT"||
    message.author.bot||
    message.content.length > 300||
    !main[message.channel.id]||
    mute_server[message.guild.id]||
    mute_user[message.author.id]
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

  await fetch("https://ugc.renorari.net/api/v1/messages",{
    "method": "POST",
    "headers": {
      "Authorization": `Bearer ${process.env.UGC_KEY}`,
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(
      {
        "channel": {
          "name": message.channel.name,
          "id": message.channel.id
        },
        "author": {
          "username": message.author.username,
          "discriminator": message.author.discriminator,
          "id": message.author.id,
          "avatarURL": message.author.avatarURL({ "dynamic": true, "format": "png", "size": 512 }),
          "bot": message.author.bot
        },
        "guild": {
          "name": message.guild.name,
          "id": message.guild.id,
          "iconURL": message.guild.iconURL({ "dynamic": true, "format": "png", "size": 256 })
        },
        "message": {
          "content": message.content,
          "id": message.id,
          "clean_content": message.cleanContent,
          "reference": reference,
          "attachments": message.attachments.map((attachment) => ({
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
  })
}