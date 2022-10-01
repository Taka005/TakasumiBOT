async function guideline_role(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("guide_")){
    const role = interaction.customId.split("_");
    if(await interaction.member.roles.cache.has(role[1])) return await interaction.reply({
      embeds:[{
        author: {
          name: "既に同意済みです",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このサーバーのガイドラインに既に同意しているようです"
      }],
      ephemeral:true
    });

    await interaction.member.roles.add(role[1])
      .then(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "同意しました",
              icon_url: "https://cdn.taka.ml/images/success.png",
            },
            description: "このサーバーのガイドラインに同意しました\nこれでロールが付与され、晴れてサーバーの一員となりました",
            color: "GREEN"
          }],
          ephemeral: true
        });
      })
      .catch(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "同意に失敗しました",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "BOTの権限が不足しているか、付与するロールがBOTより上の可能性があります\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
          }],
          ephemeral:true
        });
      })
  }
}

module.exports = guideline_role