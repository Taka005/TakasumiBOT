module.exports = async(interaction)=>{
  const point = require("../../data/point.json");
  const fetch = require("node-fetch");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "メンバー情報を表示"){
    const member = await interaction.options.getMember("user");

    if(!member) return await interaction.reply({
      embeds:[{
        author: {
          name: "メンバーを取得できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description:"指定したユーザーが存在していないか、サーバーから退出しています"
      }],
      ephemeral:true
    });

    const members = await fetch("https://auth.taka.ml/data/user.json")
      .then(res=>res.json())
      .catch(()=>{})

    const point_user = point[member.user.id];

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name:`${member.user.tag}の検索結果`,
          url: `https://discord.com/users/${member.user.id}`,
          icon_url: "https://cdn.taka.ml/images/system/success.png"
        },
        timestamp: new Date(),
        footer: {
          text: "TakasumiBOT"
        },
        thumbnail: {
          url: member.user.avatarURL({ format: "png", dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        fields: [
          {
            name: "ID",
            value: `${member.user.id}`,
            inline: true
          },
          {
            name: "ニックネーム",
            value: member.nickname||"未設定",
            inline: true
          },
          {
            name: "評価",
            value: point[member.user.id]||"10.0",
            inline: true
          },
          {
            name: "作成日時",
            value: `${new Date(member.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - member.user.createdAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name:"参加日時",
            value: `${new Date(member.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - member.joinedAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name: "アカウントの種類",
            value: member.user.bot ? "BOT" : "ユーザー",
            inline: true
          },
          {
            name: "TakasumiBOT Membersへの加入",
            value: members[member.user.id] ? "加入済み" : "未加入",
            inline: true
          },
          {
            name:"ロール",
            value: `${member.roles.cache.map(r => r).join("")}`
          }
        ]
      }]
    })
    .catch((error)=>{
      interaction.reply({
        embeds:[{
          author: {
            name: "正常に送信できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
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