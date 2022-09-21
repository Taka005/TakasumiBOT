async function member(interaction){
  const point = require("../../data/point.json");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "メンバー情報を表示"){
    const info = await interaction.options.getMember("user");

    const point_user = point[info.user.id];

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name:`${info.user.tag}の検索結果`,
          url: `https://discord.com/users/${info.user.id}`,
          icon_url: "https://taka.ml/images/success.png"
        },
        timestamp: new Date(),
        footer: {
          text: "TakasumiBOT"
        },
        thumbnail: {
          url: info.user.avatarURL({ format: "png", dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        fields: [
          {
            name: "ID",
            value: `${info.user.id}`,
            inline: true
          },
          {
            name: "ニックネーム",
            value: member.nickname||"未設定",
            inline: true
          },
          {
            name: "評価",
            value: point_user||"10.0",
            inline: true
          },
          {
            name: "作成日時",
            value: `${new Date(info.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - info.user.createdAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name:"参加日時",
            value: `${new Date(info.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - info.joinedAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name: "アカウントの種類",
            value: info.user.bot ? "BOT" : "ユーザー",
            inline: true
          },
          {
            name:"ロール",
            value: `${info.roles.cache.map(r => r).join('')}`
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
    return;
  }
}

module.exports = member