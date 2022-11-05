module.exports = async(interaction)=>{
  if(!interaction.isSelectMenu()) return;
  if(interaction.customId.startsWith("imagerole_")){
    const list = await interaction.customId.split("_");
    const key = await interaction.values[0];

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

    if(key === list[2]){
      await interaction.member.roles.add(list[1])
        .then(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: `認証しました`,
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
          });
        })
    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "選択した値が間違っています",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "画像に表示される文字を正確に選択してください"
        }],
        ephemeral:true
      });
    }
  }
}