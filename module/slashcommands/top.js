async function top(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "top"){
    await interaction.deferReply();
    await interaction.editReply({
      embeds: [{
        color:"WHITE",
        description: "取得中..."
      }]
    });

    const msg = await interaction.channel.messages.fetch({after:"0",limit:1})
      .then(msg => msg.first())

    const link = new MessageButton()
      .setLabel("メッセージへ飛ぶ")
      .setURL(`${msg.url}`)
      .setStyle("LINK")

    await interaction.editReply({
      embeds: [{
        color:"WHITE",
        title:"最初のメッセージ",
        description: "下のリンクから飛べます"
      }],
      components: [
        new MessageActionRow()
          .addComponents(link)
      ]
    })
  }
}
  
module.exports = top