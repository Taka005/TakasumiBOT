module.exports = async(interaction)=>{
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("panelrole_")){
    const list = await interaction.customId.split("_");
    const code = await interaction.fields.getTextInputValue("code");

    if(interaction.member.roles.cache.has(list[1])) return await interaction.reply({
      embeds:[{
        author: {
          name: "既に認証済みです",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
      }],
      ephemeral:true
    });

    if(isNaN(code)) return await interaction.reply({
      embeds:[{
        author: {
          name: "認証コードが間違っています",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "答えの数字を半角で入力してください"
      }],
      ephemeral:true
    });

    if(code === list[2]){
      await interaction.member.roles.add(list[1])
        .then(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "認証しました",
                icon_url: "https://cdn.taka.ml/images/system/success.png",
              },
              color: "GREEN"
            }],
            ephemeral: true
          });
        })
        .catch((error)=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "認証に失敗しました",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
              },
              color: "RED",
              description: "BOTの権限が不足しているか、付与するロールがBOTより上の可能性があります",
              fields: [
                {
                  name: "エラーコード",
                  value: `\`\`\`${error}\`\`\``
                }
              ]
            }],
            ephemeral:true
          })
        })
    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "入力コードが間違っています",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "認証時に表示される画面のテキストボックスの\n上に表記されている通りに認証してください"
        }],
        ephemeral:true
      })
    }
  }
}