async function ticket(message){
  const {MessageButton, MessageActionRow} = require("discord.js");
  const reply = `<@!${message.author.id}>`;
  const config = require("../../config.json");
  if(message.content === `${config.prefix}ticket`){
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${reply}${config.prefix}tiketを使うには管理者権限が必要です`)
      message.delete();
      const ticket_button = new MessageButton().setCustomId("ticket").setStyle("PRIMARY").setLabel("チケット");
      message.channel.send({
        embeds: [{
            color:`WHITE`,
            title:`お問い合わせ`,
            description: `お問い合わせを開始する場合は下のボタンを押してください\n\n※ 不必要なチケットの作成はおやめ下さい`
        }],
        components: [new MessageActionRow().addComponents(ticket_button)]
      });
      if(message.guild.channels.cache.find(name => name.name === "ticket")) return;
      message.guild.channels.create('ticket',{
         type: 'GUILD_CATEGORY'
      });
  }
}
  
module.exports = ticket