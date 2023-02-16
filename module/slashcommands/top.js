module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "top"){

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("READ_MESSAGE_HISTORY")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "この機能は、BOTに以下の権限が必要です\n```テキストチャンネルの閲覧\nメッセージ履歴を読む```"
      }],
      ephemeral:true
    });

    await interaction.deferReply();
    await interaction.editReply({
      embeds: [{
        color: "GREEN",
        description: "取得中..."
      }]
    });

    const msg = await interaction.channel.messages.fetch({after:"0",limit:1})
      .then(msg=>msg.first())

    await interaction.editReply({
      embeds: [{
        color: "GREEN",
        title: "最初のメッセージ",
        description: "下のリンクから飛べます"
      }],
      components: [
        new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setLabel("メッセージへ飛ぶ")
              .setURL(msg.url)
              .setStyle("LINK"))
      ]
    })
  }
}