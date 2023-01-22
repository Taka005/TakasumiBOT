module.exports = async(interaction)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "server"){

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name: `${interaction.guild.name}の情報`,
          icon_url: "https://cdn.taka.ml/images/system/success.png",
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
            name: "所有者",
            value: `<@${interaction.guild.ownerId}>`,
            inline: true
          },
          {
            name: "人数",
            value: `合計:${interaction.guild.memberCount}人\nユーザー:${(await interaction.guild.members.fetch()).filter(m=>!m.user.bot).size}人\nBOT:${(await interaction.guild.members.fetch()).filter(m=>m.user.bot).size}人`,
          },
          {
            name: "チャンネル数",
            value: `${interaction.guild.channels.cache.size}`,
          },
          {
            name: "作成日時",
            value: `${new Date(interaction.guild.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.guild.createdAt) / 86400000)}日前)`,
          },
          {
            name: "ロール",
            value: `${interaction.guild.roles.cache.size}個`,
          }
        ]
      }]
    }).catch(async(error)=>{
      await interaction.reply({
        embeds:[{
          author: {
            name: "エラーが発生しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
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
      })
    });
  }
}