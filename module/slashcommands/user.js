async function user(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "user"){
    const user_id = await interaction.options.getString("id");
    const status_data = {
        "online": "🟢オンライン",
        "offline": "⚫オフライン",
        "dnd": "⛔取り込み中",
        "idle": "🌙退席中"
      };

      if(!user_id){
        await interaction.reply({
          embeds:[{
            color: "WHITE",
            timestamp: new Date(),
            footer: {
              text: "TakasumiBOT"
            },
            thumbnail: {
              url: interaction.member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "**ユーザー名**",
                value: `${interaction.user.tag}`
              },
              {
                name: "**ID**",
                value: `${interaction.member.user.id}`,
                inline: true
              },
              {
                name: "**ニックネーム**",
                value: interaction.member.nickname||"未設定",
                inline: true
              },
              {
                name: "状態",
                value: `${status_data[interaction.member.presence?.status]||"取得不能"}`,
                inline: true
              },
              {
                name: "**作成日時**",
                value: `${new Date(interaction.member.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.member.user.createdAt) / 86400000)}日前)`,
                inline: true
              },
              {
                name:"**参加日時**",
                value: `${new Date(interaction.member.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.member.joinedAt) / 86400000)}日前)`,
                inline: true
              },
              {
                name: "アカウントの種類",
                value: interaction.user.bot ? "BOT" : "ユーザー",
                inline: true
              },
              {
                name:"**ロール**",
                value: `${interaction.member.roles.cache.map(r => r).join('')}`,
                inline: true
              },
              {
                name:"**権限**",
                value: `${permissions.join("|")}`,
                inline: true
              }
            ]
          }]
        });
        return;
      }
  
      const id = user_id.match(/\d{18}/g);
      if(!id) return await interaction.reply({
        embeds:[{
          author: {
            name: "取得に失敗しました",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "正確にIDまたは、メンションをしてください"
        }],
        ephemeral:true
      });
  
      const member = await interaction.guild.members.cache.get(id[0]);
        if(member){
          await interaction.reply({
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
                  value: `${member.roles.cache.map(r => r).join('')}`,
                  inline: true
                }
              ]
            }]
          });
        }else{
          try{
            const users = await client.users.fetch(id[0]);
            await interaction.reply({
              embeds:[{
                color: "WHITE",
                timestamp: new Date(),
                footer: {
                  text: "TakasumiBOT"
                },
                thumbnail: {
                  url: users.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                fields: [
                  {
                    name: "**ユーザー名**",
                    value: `${users.tag}`,
                  },
                  {
                    name: "**ID**",
                    value: `${users.id}`,
                    inline: true
                  },
                  {
                    name: "**作成日時**",
                    value: `${new Date(users.createdTimestamp).toLocaleDateString()}`,
                    inline: true
                  },
                  {
                    name: "**アカウントの種類**",
                    value: users.bot ? "BOT" : "ユーザー",
                    inline: true
                  }
                ]
              }]
            });
          }catch{
            return await interaction.reply({
              embeds:[{
                author: {
                  name: "取得に失敗しました",
                  icon_url: "https://taka.ml/images/error.jpg",
                },
                color: "RED",
                description: "指定されたユーザーは存在しないか、\n間違っています"
              }],
              ephemeral:true
            });
          }
        }
    return;
  }
}
    
module.exports = user