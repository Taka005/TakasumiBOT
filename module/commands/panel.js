async function panel(message){
  const {MessageButton, MessageActionRow} = require("discord.js");
  const reply = `<@!${message.author.id}>`;
  const config = require("../../config.json");
  if(message.content.startsWith(`${config.prefix}panel`)){
    if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`${reply}${config.prefix}panelを使うには「ロールの管理」の権限が必要です`);         
      if(!message.content.match(/\d{18}/)) return message.channel.send(`${reply}引数に付与したいロールIDまたは、メンションしてください`);
        const role = message.content.match(/\d{18}/);
        message.delete();
        const auth_button = new MessageButton().setCustomId(`panel_${role}`).setStyle("PRIMARY").setLabel("認証");
          await message.channel.send({
            embeds: [{
              color:"BLUE",
                description: `<@&${role}>を貰うには、認証ボタンを押してください`
              }],
              components: [new MessageActionRow().addComponents(auth_button)]
          });
    return;
  }  
}

module.exports = panel