async function server(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "server"){
    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name: `${interaction.guild.name}の情報`,
          icon_url: "https://taka.ml/images/success.png",
        },
        timestamp: new Date(),
        thumbnail: {
          url: `${interaction.guild.iconURL()}`
        },
        fields: [
          {
            name: "ID",
            value: `${interaction.guild.id}`,
            inline: true
          },
          {
            name: "人数",
            value: `${interaction.guild.memberCount}人`,
            inline: true
          },
          {
            name: "チャンネル数",
            value: `${interaction.guild.channels.cache.size}`,
            inline: true
          },
          {
            name: "作成日時",
            value: `${new Date(interaction.guild.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.guild.createdAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name: "ロール",
            value: `${interaction.guild.roles.cache.size}個`,
            inline: true
          }
        ]
      }]
    }).catch((error)=>interaction.reply({
        embeds:[{
          author: {
            name: "エラーが発生しました",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "もう一度試してください",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],
        ephemeral:true
      }));
  }
}
    
module.exports = server