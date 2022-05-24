function auth(message,client){
  const reply = `<@!${message.author.id}>`;
  const config = require("../../config.json");
  if(message.content.startsWith(`${config.prefix}auth`)){
    if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`${reply}${config.prefix}authを使うには「ロールの管理」の権限が必要です`);         
      if(!message.content.macth(/\d{18}/)) return message.reply("引数に付与したいロールIDまたは、メンションしてください");
        const roll = message.content.match(/\d{18}/);
        const auth_button = new MessageButton().setCustomId(`auth_${roll}`).setStyle("PRIMARY").setLabel("認証");
          await message.channel.send({
              embeds: [{
                  description: `<@&${roll}>を貰うには、認証ボタンを押してください`
              }],
              components: [new MessageActionRow().addComponents(auth_button)]
          });
      }  
}

module.export = auth