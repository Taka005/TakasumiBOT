async function user(message,client){
  const config = require("../../config.json")
  if(message.content.startsWith(`${config.prefix}user`)){
    const status_data = {
      "online": "🟢オンライン",
      "offline": "⚫オフライン",
      "dnd": "⛔取り込み中",
      "idle": "🌙退席中"
    };

    if(message.content === `${config.prefix}user`){
      message.reply({
        embeds:[{
        title: "ユーザー情報",
        color: "WHITE",
        timestamp: new Date(),
        thumbnail: {
          url: message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        fields: [
          {
            name: "**ユーザー名**",
            value: `${message.author.tag}`
          },
          {
            name: "**ID**",
            value: `${message.author.id}`,
            inline: true
          },
          {
            name: "**ニックネーム**",
            value: message.member.nickname || `設定されていません`,
            inline: true
          },
          {
            name: "状態",
            value: `${status_data[message.member.presence?.status]}`,
            inline: true
          },
          {
            name: "**作成日時**",
            value: `${new Date(message.author.createdTimestamp).toLocaleDateString()}`,
            inline: true
          },
          {
            name: "アカウントの種類",
            value: message.author.bot ? "BOT" : "ユーザー",
            inline: true
        },
        ]}]
      });
      return;
    }
    try{
      const args = message.content.split(" ").slice(1);
      let user = await client.users.fetch(args[0])
      message.reply({
        embeds:[{
        title: "ユーザー情報",
        color: 7506394,
        timestamp: new Date(),
        thumbnail: {
          url: user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        fields: [
          {
            name: "**ユーザー名**",
            value: `${user.tag}`
          },
          {
            name: "**ユーザーID**",
            value: `${user.id}`
          },
          {
            name: "**アカウント作成日**",
            value: `${new Date(user.createdTimestamp).toLocaleDateString()}`
          },
          {
            name: "**BOT**",
            value: `${user.bot}`
          }
        ]}]
      });
    }catch{
      message.reply("ユーザーを取得出来ませんでした")
    } 
    return;
  }
}

module.exports = user