async function auth_event(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("auth_")){
    const role = interaction.customId.match(/\d{18}/);
    await interaction.member.roles.add(role)
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
    return;
  }
}

module.exports = auth_event