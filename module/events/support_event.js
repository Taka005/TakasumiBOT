async function support_event(interaction,client){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("support_")){
    const list = await interaction.customId.split("_");
    const code = await interaction.fields.getTextInputValue("code");
    const content = await interaction.fields.getTextInputValue("content");

    if(isNaN(code)) return await interaction.reply({
      embeds:[{
        author: {
          name: "確認コードが間違っています",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "確認コードは、数字を半角で入力してください\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
      }],
      ephemeral:true
    });

    if(code === list[1]){
      await client.channels.cache.get("986249483098673222").send({
        embeds:[{
          color: "GREEN",
          author: {
            name: `${interaction.member.user.id}`,
            url: `https://discord.com/users/${interaction.member.user.id}`,
            icon_url: interaction.member.user.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png"
           },
          description: content,
          footer: {
            text:`${interaction.guild.name}<${interaction.guild.id}>`,
            icon_url:interaction.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date()
        }]
      });
      await interaction.reply({
        embeds:[{
          author: {
            name: "送信しました",
            icon_url: "https://cdn.taka.ml/images/success.png",
          },
          color: "GREEN",
          description: "ご報告ありがとうございました",
        }],
        ephemeral: true
      });

    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "確認コードが間違っています",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "コマンド実行時に表示される画面のテキストボックスの\n上に表記されている通りに操作してください"
        }],
        ephemeral:true
      });
    }
  }
}

module.exports = support_event