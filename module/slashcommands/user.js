async function user(interaction,client){
  const point = require("../../data/point.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "user"){
    const user_id = await interaction.options.getString("id");

      if(!user_id){
        const point_user = point[interaction.member.user.id];

        await interaction.reply({
          embeds:[{
            color: "GREEN",
            author: {
              name:`${interaction.member.user.tag}の検索結果`,
              url: `https://discord.com/users/${interaction.member.user.id}`,
              icon_url: "https://cdn.taka.ml/images/success.png"
            },
            timestamp: new Date(),
            footer: {
              text: "TakasumiBOT"
            },
            thumbnail: {
              url: interaction.member.user.avatarURL({ format: "png", dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "ID",
                value: `${interaction.member.user.id}`,
                inline: true
              },
              {
                name: "ニックネーム",
                value: interaction.member.nickname||"未設定",
                inline: true
              },
              {
                name: "評価",
                value: point_user||"10.0",
                inline: true
              },
              {
                name: "作成日時",
                value: `${new Date(interaction.member.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.member.user.createdAt) / 86400000)}日前)`,
                inline: true
              },
              {
                name:"参加日時",
                value: `${new Date(interaction.member.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.member.joinedAt) / 86400000)}日前)`,
                inline: true
              },
              {
                name: "アカウントの種類",
                value: interaction.user.bot ? "BOT" : "ユーザー",
                inline: true
              },
              {
                name:"ロール",
                value: `${interaction.member.roles.cache.map(r => r).join('')}`
              }
            ]
          }]
        }).catch((error)=>interaction.reply({
          embeds:[{
            author: {
              name: "正常に送信できませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
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
        }));
        return;
      }
  
      const id = user_id.match(/\d{18,19}/g);
      if(!id) return await interaction.reply({
        embeds:[{
          author: {
            name: "取得に失敗しました",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "正確にIDまたは、メンションをしてください"
        }],
        ephemeral:true
      });
  
      const member = await interaction.guild.members.cache.get(id[0]);
        if(member){
          const point_user = point[member.user.id];

          await interaction.reply({
            embeds:[{
              color: "GREEN",
              author: {
                name:`${member.user.tag}の検索結果`,
                url: `https://discord.com/users/${member.user.id}`,
                icon_url: "https://cdn.taka.ml/images/success.png"
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
                  value: point_user||"10.0",
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
                  name:"ロール",
                  value: `${member.roles.cache.map(r => r).join('')}`
                }
              ]
            }]
          }).catch((error)=>interaction.reply({
            embeds:[{
              author: {
                name: "正常に送信できませんでした",
                icon_url: "https://cdn.taka.ml/images/error.png",
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
          }));
          
        }else{
          try{
            const users = await client.users.fetch(id[0]);
            const point_user = point[users.id];

            await interaction.reply({
              embeds:[{
                color: "GREEN",
                author: {
                  name:`${users.tag}の検索結果`,
                  url: `https://discord.com/users/${users.id}`,
                  icon_url: "https://cdn.taka.ml/images/success.png"
                },
                timestamp: new Date(),
                footer: {
                  text: "TakasumiBOT"
                },
                thumbnail: {
                  url: users.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                fields: [
                  {
                    name: "ID",
                    value: `${users.id}`,
                    inline: true
                  },
                  {
                    name: "作成日時",
                    value: `${new Date(users.createdTimestamp).toLocaleDateString()}`,
                    inline: true
                  },
                  {
                    name: "評価",
                    value: point_user||"10.0",
                    inline: true
                  },
                  {
                    name: "アカウントの種類",
                    value: users.bot ? "BOT" : "ユーザー",
                    inline: true
                  }
                ]
              }]
            });
          }catch(error){
            return await interaction.reply({
              embeds:[{
                author: {
                  name: "取得に失敗しました",
                  icon_url: "https://cdn.taka.ml/images/error.png",
                },
                color: "RED",
                description: "指定されたユーザーは存在しないか、\n間違っています",
                fields: [
                  {
                    name: "エラーコード",
                    value: `\`\`\`${error}\`\`\``
                  }
                ]
              }],
              ephemeral:true
            });
          }
        }
  }
}
    
module.exports = user