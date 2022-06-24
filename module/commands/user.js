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
          color: "WHITE",
          timestamp: new Date(),
          footer: {
            text: "TakasumiBOT"
          },
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
              value: message.member.nickname||"未設定",
              inline: true
            },
            {
              name: "状態",
              value: `${status_data[message.member.presence?.status]||"取得不能"}`,
              inline: true
            },
            {
              name: "**作成日時**",
              value: `${new Date(message.author.createdTimestamp).toLocaleDateString()}`,
              inline: true
            },
            {
              name:"**参加日時**",
              value: `${new Date(message.member.joinedTimestamp).toLocaleDateString()}`,
              inline: true
            },
            {
              name: "アカウントの種類",
              value: message.author.bot ? "BOT" : "ユーザー",
              inline: true
            },
            {
              name:"**ロール**",
              value: `${message.member.roles.cache.map(r => r).join('')}`,
              inline: true
            }
          ]
        }]
      });
      return;
    }

    const id = message.content.match(/\d{18}/g);
    if(!id) return message.reply({
      embeds:[{
        author: {
          name: "取得に失敗しました",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "正確にIDまたは、メンションをしてください"
      }]
    });

    const member = await message.guild.members.fetch(id[0])
      .catch(async()=>{
        try{
          const user = await client.users.fetch(id[0])
          message.reply({
            embeds:[{
              color: "WHITE",
              timestamp: new Date(),
              footer: {
                text: "TakasumiBOT"
              },
              thumbnail: {
                url: user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              fields: [
                {
                  name: "**ユーザー名**",
                  value: `${user.tag}`,
                },
                {
                  name: "**ユーザーID**",
                  value: `${user.id}`,
                  inline: true
                },
                {
                  name: "**アカウント作成日**",
                  value: `${new Date(user.createdTimestamp).toLocaleDateString()}`,
                  inline: true
                },
                {
                  name: "**BOT**",
                  value: user.bot ? "BOT" : "ユーザー",
                  inline: true
                }
              ]
            }]
          })
          return;
        }catch{
          return message.reply({
            embeds:[{
              author: {
                name: "取得に失敗しました",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: "指定されたユーザーは存在しないか、\n間違っています"
            }]
          });
        }
      })
    message.reply({
      embeds:[{
        color: "WHITE",
        timestamp: new Date(),
        footer: {
          text: "TakasumiBOT"
        },
        thumbnail: {
          url: member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        fields: [
          {
            name: "**ユーザー名**",
            value: `${member.user.tag}`
          },
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
            name: "状態",
            value: `${status_data[member.presence?.status]||"取得不能"}`,
            inline: true
          },
          {
            name: "**作成日時**",
            value: `${new Date(member.user.createdTimestamp).toLocaleDateString()}`,
            inline: true
          },
          {
            name:"**参加日時**",
            value: `${new Date(member.joinedTimestamp).toLocaleDateString()}`,
            inline: true
          },
          {
            name: "アカウントの種類",
            value: member.user.bot ? "BOT" : "ユーザー",
            inline: true
          },
          {
            name:"**ロール**",
            value: `${member.roles.cache.map(r => r).join('')}`,
            inline: true
          }
        ]
      }]
    });
    return;
  }
}

module.exports = user