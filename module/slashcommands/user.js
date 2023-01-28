module.exports = async(interaction,client)=>{
  const mysql = require("../lib/mysql");
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "user"){
    const user_id = interaction.options.getString("id");

    if(!user_id){
      const members = await mysql(`SELECT * FROM account WHERE id = ${interaction.member.user.id} LIMIT 1;`);

      await interaction.reply({
        embeds:[{
          color: "GREEN",
          author: {
            name:`${interaction.member.user.tag}の検索結果`,
            url: `https://discord.com/users/${interaction.member.user.id}`,
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          timestamp: new Date(),
          footer: {
            text: "TakasumiBOT"
          },
          thumbnail: {
            url: interaction.member.user.avatarURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
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
              value: interaction.member.user.bot ? "BOT" : "ユーザー",
              inline: true
            },
            {
              name: "TakasumiBOT Membersへの加入",
              value: members[0] ? "加入済み" : "未加入"
            },
            {
              name:"ロール",
              value: `${interaction.member.roles.cache.map(r => r).join('')}`
            }
          ]
        }]
      }).catch(async(error)=>{
        await interaction.reply({
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
      return;
    }
  
    const id = user_id.match(/\d{18,19}/g);
    if(!id) return await interaction.reply({
      embeds:[{
        author: {
          name: "取得に失敗しました",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "正確にIDまたは、メンションをしてください"
      }],
      ephemeral:true
    });

    const member = await interaction.guild.members.cache.get(id[0]);
    if(member){
      const members = await mysql(`SELECT * FROM account WHERE id = ${member.user.id} LIMIT 1;`);

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
            url: member.user.avatarURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
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
              value: member.user.bot ? "BOT" : "ユーザー"
            },
            {
              name: "TakasumiBOT Membersへの加入",
              value: members[0] ? "加入済み" : "未加入",
              inline: true
            },
            {
              name:"ロール",
              value: `${member.roles.cache.map(r => r).join('')}`
            }
          ]
        }]
      }).catch(async(error)=>{
        await interaction.reply({
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
          components: [
            new MessageActionRow()
              .addComponents( 
                new MessageButton()
                  .setLabel("サポートサーバー")
                  .setURL("https://discord.gg/NEesRdGQwD")
                  .setStyle("LINK"))
          ],
          ephemeral:true
        })
      });   
    }else{
      try{
        const user = await client.users.fetch(id[0]);
        const members = await mysql(`SELECT * FROM account WHERE id = ${user.id} LIMIT 1;`);

        await interaction.reply({
          embeds:[{
            color: "GREEN",
            author: {
              name:`${user.tag}の検索結果`,
              url: `https://discord.com/users/${user.id}`,
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            timestamp: new Date(),
            footer: {
              text: "TakasumiBOT"
            },
            thumbnail: {
              url: user.avatarURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "ID",
                value: `${user.id}`,
                inline: true
              },
              {
                name: "作成日時",
                value: `${new Date(user.createdTimestamp).toLocaleDateString()}`,
                inline: true
              },
              {
                name: "アカウントの種類",
                value: user.bot ? "BOT" : "ユーザー",
                inline: true
              },
              {
                name: "TakasumiBOT Membersへの加入",
                value: members[0] ? "加入済み" : "未加入"
              }
            ]
          }]
        });
      }catch(error){
        return await interaction.reply({
          embeds:[{
            author: {
              name: "取得に失敗しました",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
          components: [
            new MessageActionRow()
              .addComponents( 
                new MessageButton()
                  .setLabel("サポートサーバー")
                  .setURL("https://discord.gg/NEesRdGQwD")
                  .setStyle("LINK"))
          ],
          ephemeral:true
        });
      }
    }
  }
}