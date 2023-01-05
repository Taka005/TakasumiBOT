module.exports = async(interaction,client)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ban"){
    const user = interaction.options.getString("user");
    const reason = interaction.options.getString("reason")||`${interaction.member.user.tag}によってBANしました(TakasumiBOT)`;
    const days = interaction.options.getInteger("days");
    
    if(!interaction.member.permissions.has("BAN_MEMBERS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`メンバーをBAN`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(!interaction.guild.me.permissionsIn(interaction.channel).has("BAN_MEMBERS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```メンバーをBAN```"
      }],
      ephemeral:true
    });

    const id = user.match(/\d{18,19}/g);
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

    if(id === interaction.member.user.id) return await interaction.reply({
      embeds:[{
        author: {
          name: "メンバーをBANできませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "自分自身をBANすることはできません"
      }],
      ephemeral:true
    });

    const users = await client.users.fetch(id[0])
      .catch(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "メンバーをBANできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "指定したユーザーが存在しません"
          }],
          ephemeral:true
        })
      });
    
    if(days){
      await interaction.guild.bans.create(id[0],{ reason: reason, days: days })
        .then(async ()=>{
          await interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: `${users.tag} をサーバーからBANしました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png",
              },
              color: "GREEN"
            }]
          })
        })
        .catch(async (error)=>{
          await interaction.reply({
            embeds:[{
              author: {
                name: "メンバーをBANできませんでした",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
              },
              color: "RED",
              description: "BOTの権限が不足しているか、メンバーが正しく指定されていません",
              fields: [
                {
                  name: "エラーコード",
                  value: `\`\`\`${error}\`\`\``
                }
              ]
            }],
            ephemeral:true
          })
        })
    }else{
      await interaction.guild.bans.create(id[0],{ reason: reason })
        .then(async()=>{
          await interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: `${users.tag} をサーバーからBANしました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png",
              },
              color: "GREEN"
            }]
          })
        })
        .catch(async(error)=>{
          await interaction.reply({
            embeds:[{
              author: {
                name: "メンバーをBANできませんでした",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
              },
              color: "RED",
              description: "BOTの権限が不足しているか、メンバーが正しく指定されていません",
              fields: [
                {
                  name: "エラーコード",
                  value: `\`\`\`${error}\`\`\``
                }
              ]
            }],
            ephemeral:true
          })
        })
    }
  }
}