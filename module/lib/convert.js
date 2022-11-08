module.exports = async(msg)=>{
  require("dotenv").config();
  const fetch = require("node-fetch");

  let reply = {
    "author": {
      "username": null,
      "discriminator": null,
      "id": null
    },
    "message": {
      "content": null
    }
  };
  let isReply = false;
  let isAttachments = false;
  let attachment = [];

  if(msg.message?.reference?.message_id){
    isReply = true;
    reply = await fetch(`https://ugc.renorari.net/api/v1/messages/${msg.message?.reference?.message_id}`,{
      "method": "GET",
      "headers": {
          "Authorization": `Bearer ${process.env.UGC_KEY}`
      }
    })
      .then((res)=>res.json())
      .catch(()=>{})
      console.log(reply)
  }

  if(msg.message.attachments.length !== 0){
    isAttachments = true;
    attachment = msg.message.attachments.map((att)=>{
      if(att.height && att.width){
        return {
          "isFile": false,
          "name": att.name,
          "url": att.url
        }
      }else{
        return {
          "isFile": true,
          "name": att.name,
          "url": att.url
        }
      }
    })
  }

  const message = 
    {
      "channel": {
        "name": msg.channel.name,
        "id": msg.channel.id
      },
      "author": {
        "tag":`${msg.author.username}#${msg.author.discriminator}`,
        "id": msg.author.id,
        "avatarURL": msg.author.avatarURL||"https://cdn.discordapp.com/embed/avatars/0.png",
        "bot": msg.author.bot
      },
      "guild": {
        "name": msg.guild.name,
        "id": msg.guild.id,
        "iconURL": msg.guild.iconURL||"https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "content": msg.message.content,
      "id": msg.message.id,
      "clean_content": msg.message.cleanContent,
      "reply": {
        "isReply": isReply,
        "user":{
          "tag": `${reply.author.username}#${reply.author.discriminator}`,
          "id": reply.author.id
        },
        "content": reply.message.content
      },
      "attachments": {
        "isAttachments": isAttachments,
        "attachment": attachment
      }
    }

  return message
}