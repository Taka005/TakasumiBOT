module.exports = async(interaction,client)=>{
  const { MessageAttachment } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "export"){

    const invites = await interaction.guild.invites.fetch(); 
    try{
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
      },null,"　 "),"UTF-8");

      const attachment = new MessageAttachment()
        .setDescription("データは慎重に扱ってください") 
        .setFile(data) 
        .setName("SERVER_JSON_FILE.json")

      await interaction.reply({content:"サーバーのデータをJSON形式に出力しました", files: [attachment] })
        .catch(()=>interaction.reply("JSONの生成に失敗しました..."));
    }catch(error){
      interaction.reply({ 
        embeds:[{
          author: {
            name: "出力に失敗しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "BOTの権限が不足しているため正しく出力できません\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }], 
        ephemeral: true 
      });
    }
  }
}