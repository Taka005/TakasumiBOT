async function auth_event(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("auth_")){
    const role = interaction.customId.split("_");

    if(interaction.member.roles.cache.has(role[1])) return await interaction.reply({
      embeds:[{
        author: {
          name: "既に認証済みです",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
      }],
      ephemeral:true
    });

    await interaction.member.roles.add(role[1])
      .then(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "認証しました",
              icon_url: "https://cdn.taka.ml/images/success.png",
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
              icon_url: "https://cdn.taka.ml/images/error.png",
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
  }
}

module.exports = auth_event