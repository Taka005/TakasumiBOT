async function panel_role(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("panelrole_")){
    const list = await interaction.customId.split("_");
    const code = await interaction.fields.getTextInputValue("code");

    if(isNaN(code)) return await interaction.reply({
      embeds:[{
        author: {
          name: "認証コードが間違っています",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "答えの数字を半角で入力してください\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
      }],
      ephemeral:true
    });

    if(code == list[2]){
      await interaction.member.roles.add(list[1])
        .then(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: `認証しました`,
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN"
            }],
            ephemeral: true
          });
        })
        .catch(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "認証に失敗しました",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: "BOTの権限が不足しているか、付与するロールがBOTより上の可能性があります\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
            }],
            ephemeral:true
          })
        })
    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "入力コードが間違っています",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "認証時に表示される画面のテキストボックスの\n上に表記されている通りに認証してください\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
        }],
        ephemeral:true
      })
    }
    return;
  }
}

module.exports = panel_role