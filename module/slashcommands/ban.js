async function ban(interaction,client){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ban"){
    const user = await interaction.options.getString("user");
    const reason = await interaction.options.getString("reason") || `${interaction.member.user.tag}によってBANしました(TakasumiBOT)`;
    const days = await interaction.options.getInteger("days");
    if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`メンバーをBAN`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    const id = user.match(/\d{18,19}/g);
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
    const users = await client.users.fetch(id[0])
      .catch(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "メンバーをBANできませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "指定したユーザーが存在しません"
          }],
          ephemeral:true
        })
      });
    
    if(days){
      await interaction.guild.bans.create(id[0],{ reason: reason, days: days })
        .then(()=>{
          interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: `${users.tag} をサーバーからBANしました`,
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN"
            }]
          })
        })
        .catch(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "メンバーをBANできませんでした",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: "BOTの権限が不足しているか、メンバーが正しく指定されていません\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
            }],
            ephemeral:true
          })
        })
    }else{
      await interaction.guild.bans.create(id[0],{ reason: reason })
        .then(()=>{
          interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: `${users.tag} をサーバーからBANしました`,
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN"
            }]
          })
        })
        .catch(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "メンバーをBANできませんでした",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: "BOTの権限が不足しているか、メンバーが正しく指定されていません\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
            }],
            ephemeral:true
          })
        })
    }
    return;
  }
}
  
module.exports = ban