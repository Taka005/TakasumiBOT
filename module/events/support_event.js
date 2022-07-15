async function support_event(interaction,client){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("support_")){
    const list = await interaction.customId.split("_");
    const code = await interaction.fields.getTextInputValue("code");
    const content = await interaction.fields.getTextInputValue("content");

    if(isNaN(code)) return await interaction.reply({
      embeds:[{
        author: {
          name: "認証コードが間違っています",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "認証コードは、数字を半角で入力してください\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
      }],
      ephemeral:true
    });

    if(code == list[1]){
      await client.channels.cache.get("986249483098673222").send({
        embeds:[{
          color: "WHITE",
          author: {
            name: `${interaction.member.id}`
           },
          description: content,
          timestamp: new Date()
        }]
      });
      await interaction.reply({
        embeds:[{
          author: {
            name: "送信しました",
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN",
          description: "ご報告ありがとうございました\n[サポートサーバー](https://discord.gg/GPs3npB63m)",
        }],
        ephemeral: true
      });

    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "認証コードが間違っています",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "認証時に表示される画面のテキストボックスの\n上に表記されている通りに認証してください\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
        }],
        ephemeral:true
      });
    }
    return;
  }
}

module.exports = support_event