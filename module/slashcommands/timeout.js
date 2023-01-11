module.exports = async(interaction)=>{
    if(!interaction.isCommand()) return;
    if(interaction.commandName === "timeout"){
      const user = interaction.options.getUser("user");
      const time = interaction.options.getInteger("time");
      const reason = interaction.options.getString("reason")||`${interaction.member.user.tag}によってタイムアウト`;
      
      if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーの\n`メンバーをモデレート`の権限を持っている必要があります"
        }],
        ephemeral:true
      });
  
      if(!interaction.guild.me.permissionsIn(interaction.channel).has("MODERATE_MEMBERS")) return await interaction.reply({
        embeds:[{
          author: {
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドは、BOTに以下の権限が必要です\n```メンバーをモデレート```"
        }],
        ephemeral:true
      });
  
      const member = await interaction.guild.members.cache.get(user.id);
      if(!member) return interaction.reply({
        embeds:[{
          author: {
            name: "取得に失敗しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "ユーザーが取得できないためタイムアウトできませんでした"
        }],
        ephemeral:true
      });
  
      if(member.user.id === interaction.member.user.id) return await interaction.reply({
        embeds:[{
          author: {
            name: "メンバーをタイムアウトできませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "自分自身をタイムアウトすることはできません"
        }],
        ephemeral:true
      });
  
      member.timeout(time*1000,reason)
        .then(()=>{
          interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: `${member.user.tag}を${time}秒タイムアウトしました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png",
              },
              color: "GREEN"
            }]
          })
        })
        .catch((error)=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "メンバーをタイムアウトできませんでした",
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