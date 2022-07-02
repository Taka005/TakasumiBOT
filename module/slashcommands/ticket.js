async function ticket(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ticket"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content:`ticketを使うには「管理者」の権限が必要です`,ephemeral:true });
      const ticket_button = new MessageButton()
        .setCustomId("ticket")
        .setStyle("PRIMARY")
        .setLabel("チケット");

      interaction.channel.send({
        embeds: [{
          color:"WHITE",
          title:`お問い合わせ`,
          description: `お問い合わせを開始する場合は下のボタンを押してください\n\n※ 不必要なチケットの作成はおやめ下さい`
        }],
        components: [new MessageActionRow().addComponents(ticket_button)]
      }).catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "チケットの作成が出来ませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "BOTの権限等を確認し、もう一度やってください\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
        }],
        ephemeral:true
      })) 

      if(!interaction.guild.channels.cache.find(name => name.name === "ticket")){
        interaction.guild.channels.create('ticket',{
          type: 'GUILD_CATEGORY'
        });
      }
      interaction.deferReply()
      .then(()=>interaction.deleteReply());
    return;
  }
};
  
module.exports = ticket