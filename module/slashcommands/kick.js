async function kick(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "kick"){
    const user = await interaction.options.getUser("user");
    const reason = await interaction.options.getString("reason") || `${interaction.member.user.tag}によってKICKしました`;
    if(!interaction.member.permissions.has("KICK_MEMBERS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`メンバーをKICK`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(!interaction.guild.me.permissionsIn(interaction.channel).has("KICK_MEMBERS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```メンバーをKICK```\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
      }],
      ephemeral:true
    });

    const member = await interaction.guild.members.cache.get(user.id);
    if(!member) return interaction.reply({
      embeds:[{
        author: {
          name: "取得に失敗しました",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "ユーザーが取得できないためKICKできませんでした"
      }],
      ephemeral:true
    });

    if(member.user.id === interaction.member.user.id) return await interaction.reply({
      embeds:[{
        author: {
          name: "メンバーをKICKできませんでした",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "自分自身をKICKすることはできません"
      }],
      ephemeral:true
    });

    member.kick({reason:`${reason}`})
      .then(()=>{
        interaction.reply({
          content:`${interaction.member}`,
          embeds:[{
            author: {
              name: `${member.user.tag}をサーバーからKICKしました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        })
      })
      .catch(async(error)=>{
        await interaction.reply({
          embeds:[{
            author: {
              name: "メンバーをKICKできませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
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
  
module.exports = kick