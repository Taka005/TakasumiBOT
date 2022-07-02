async function output(interaction,client){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "export"){
    const msg = await interaction.reply("JSON形式に出力中...");

    const invites = await interaction.guild.invites.fetch(); 
 
    const data = new Buffer.from(JSON.stringify({
       "guild":{
          "name":interaction.guild.name,
          "id":interaction.guild.id,
          "count":interaction.guild.memberCount,
          "icon":interaction.guild.iconURL(),
          "invite":{
             "url":invites.map(invite => invite.url),
             "code":invites.map(invite => invite.code)
          },
          "channels":{
             "name":interaction.guild.channels.cache.map(channel => channel.name),
             "id":interaction.guild.channels.cache.map(channel => channel.id),
             "topic":interaction.guild.channels.cache.map(channel => channel.topic),
             "type":interaction.guild.channels.cache.map(channel => channel.type),
             "count":interaction.guild.channels.cache.size
          },
          "members":{
             "name":interaction.guild.members.cache.map(member => member.user.tag),
             "id:":interaction.guild.members.cache.map(member => member.user.id),
             "color":interaction.guild.members.cache.map(member =>member.displayHexColor),
             "avatar":interaction.guild.members.cache.map(member =>member.user.avatarURL())
          },
          "roles":{
             "name":interaction.guild.roles.cache.map(role => role.name),
             "id":interaction.guild.roles.cache.map(role => role.id)
          }
       },
       "bot":{
          "user":client.user.tag,
          "ping":client.ws.ping
       }
    },null,"　"),"UTF-8");
  
   
    const attachment = new MessageAttachment()
       .setDescription("データは慎重に扱ってください") 
       .setFile(data) 
       .setName("SERVER_JSON_FILE.json")
    msg.edit({content:"サーバーのデータをJSON形式に出力しました", files: [attachment] })
       .catch(()=>msg.edit("JSONの生成に失敗しました..."))
    return;
  }
};
  
module.exports = output