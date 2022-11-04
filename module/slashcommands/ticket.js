module.exports = async(interaction)=>{
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ticket"){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content:`ticketを使うには「管理者」の権限が必要です`,ephemeral:true });
      const ticket_button = new MessageButton()
        .setCustomId("ticket")
        .setStyle("PRIMARY")
        .setLabel("チケット");

      await interaction.channel.send({
        embeds: [{
          color:"GREEN",
          title:`お問い合わせ`,
          description: `お問い合わせを開始する場合は下のボタンを押してください\n\n※ 不必要なチケットの作成はおやめ下さい`
        }],
        components: [
          new MessageActionRow()
            .addComponents(ticket_button)
        ]
      }).catch(async(error)=>{
        await interaction.reply({
          embeds:[{
            author: {
              name: "チケットが作成出来ませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "BOTの権限等を確認し、もう一度実行してください",
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          ephemeral:true
        })
      }); 

      if(!interaction.guild.channels.cache.find(name => name.name === "ticket")){
        await interaction.guild.channels.create("ticket",{
          type: "GUILD_CATEGORY"
        });
      }
      await interaction.deferReply()
        .then(()=>interaction.deleteReply());
  }
}