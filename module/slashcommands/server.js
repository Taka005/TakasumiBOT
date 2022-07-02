async function server(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "server"){
    await interaction.reply({
      embeds:[{
        color: "WHITE",
        timestamp: new Date(),
        thumbnail: {
          url: `${interaction.guild.iconURL()}`
        },
        fields: [
          {
            name: "**サーバー名**",
            value: `${interaction.guild.name}`
          },
          {
            name: "サーバーID",
            value: `${interaction.guild.id}`,
            inline: true
          },
          {
            name: "**サーバーの人数**",
            value: `${interaction.guild.memberCount}人`,
            inline: true
          },
          {
            name: "**ロール**",
            value: `${interaction.guild.roles.cache.map(r => r).join('')}`,
            inline: true
          }
        ]
      }]
    }).catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "情報の表示に失敗しました",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "サーバーで設定されているロールが多すぎたため\n表示できませんでした"
        }],
        ephemeral:true
      }))
    return;
  }
}
    
module.exports = server