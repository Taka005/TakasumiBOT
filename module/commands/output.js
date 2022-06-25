async function output(message,client){
  const config = require("../../config.json");
  const { MessageAttachment } = require("discord.js")
  
  if(message.content === `${config.prefix}export`){
    const msg = await message.reply("JSON書き込み中....");

    const data = new Buffer({
      "guild":{
          "name":message.guild.name,
          "id":message.guild.id,
          "count":message.guild.memberCount,
          "icon":message.guild.iconURL(),
          "invite":message.guild.invites.cache.map(invite => invite.url),
          "channels":{
             "name":message.guild.channels.cache.map(channel => channel.name),
             "id":message.guild.channels.cache.map(channel => channel.id),
             "type":message.guild.channels.cache.map(channel => channel.type),
             "count":message.guild.channels.cache.size
          },
          "members":{
             "name":message.guild.members.cache.map(member => member.user.tag),
             "id:":message.guild.members.cache.map(member => member.user.id),
             "color":message.guild.members.cache.map(member =>member.displayHexColor),
             "avatar":message.guild.members.cache.map(member =>member.user.avatarURL())
          },
          "roles":{
             "name":message.guild.roles.cache.map(role => role.name),
             "id":message.guild.roles.cache.map(role => role.id)
          }
       },
       "bot":{
          "user":client.user.tag,
          "ping":client.ws.ping
       }
    },"UTF-8");
 
  
    const attachment = new MessageAttachment(data, `${message.guild.name}_JSON_FILE.json`);
    msg.edit({ files: [attachment] })
      .catch(()=>msg.edit("JSONの生成に失敗しました..."))
  }
}
  
module.exports = output