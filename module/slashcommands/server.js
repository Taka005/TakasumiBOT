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
            value: `${interaction.guild.id}`
          },
          {
            name: "所有者",
            value: `<@${interaction.guild.ownerId}>`
          },
          {
            name: "人数",
            value: `${interaction.guild.memberCount}人(ユーザー:${(await interaction.guild.members.fetch()).filter(m=>!m.user.bot).size}人 BOT:${(await interaction.guild.members.fetch()).filter(m=>m.user.bot).size}人)`
          },
          {
            name: "作成日時",
            value: `${new Date(interaction.guild.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.guild.createdAt) / 86400000)}日前)`
          },
          {
            name: "統計情報",
            value: `チャンネル:${interaction.guild.channels.cache.size}個\nロール:${(await interaction.guild.roles.fetch()).size}個\n絵文字:${(await message.guild.emojis.fetch()).size}\nステッカー:${(await message.guild.stickers.fetch()).size}`
          },
          {
            name: "Nitro",
            value: `${interaction.guild.premiumSubscriptionCount}ブースト(${interaction.guild.premiumTier}レベル)`
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