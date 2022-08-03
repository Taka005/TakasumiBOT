async function member(interaction){
  if(!interaction.isContextMenu()) return;
  const member = interaction.options.getMember("user");

  await interaction.reply({
    embeds:[{
      color: "GREEN",
      author: {
        name:`${member.user.tag}の検索結果`,
        icon_url: "https://taka.ml/images/success.png"
      },
      timestamp: new Date(),
      footer: {
        text: "TakasumiBOT"
      },
      thumbnail: {
        url: member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      fields: [
        {
          name: "**ID**",
          value: `${member.id}`,
          inline: true
        },
        {
          name: "**ニックネーム**",
          value: member.nickname||"未設定",
          inline: true
        },
        {
          name: "**作成日時**",
          value: `${new Date(member.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - member.user.createdAt) / 86400000)}日前)`,
          inline: true
        },
        {
          name:"**参加日時**",
          value: `${new Date(member.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - member.joinedAt) / 86400000)}日前)`,
          inline: true
        },
        {
          name: "アカウントの種類",
          value: member.user.bot ? "BOT" : "ユーザー",
          inline: true
        },
        {
          name:"**ロール**",
          value: `${member.roles.cache.map(r => r).join('')}`
        }
      ]
    }]
  })
    .catch((error)=>{
      interaction.reply({
        embeds:[{
          author: {
            name: "正常に送信できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: `\`\`\`${error}\`\`\`\n[サポートサーバー](https://discord.gg/GPs3npB63m)`
        }],
        ephemeral:true
      })
    });
}

module.exports = member