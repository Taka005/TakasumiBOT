module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "about"){
    
    await interaction.reply({
      embeds:[{
        color: "GREEN",
        title: "TakasumiBOTとは",
        description: "便利で多機能BOTを目指して開発されています\nグローバルチャット、認証機能など幅広い機能があります\nサポートサーバーへの参加もよろしくお願いします\n制作:[Taka005#6668](https://discord.com/users/790489873957781536)\n\n関連リンク\n[公式サイト](https://takasumibot.taka.ml/)\n[ステータス](https://status.taka.ml/)\n[グローバルチャット利用規約](https://gc.taka.ml/)\n[TakasumiBOT Auth](https://auth.taka.ml/)\n[個人サイト](https://taka.ml/)"
      }],
      components:[
        new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setLabel("BOT招待")
              .setURL("https://discord.com/api/oauth2/authorize?client_id=981314695543783484&permissions=1644971949559&scope=bot%20applications.commands")
              .setStyle("LINK"))
          .addComponents(
            new MessageButton()
              .setLabel("サポートサーバー")
              .setURL("https://discord.gg/NEesRdGQwD")
              .setStyle("LINK"))
      ]
    });
  }
}