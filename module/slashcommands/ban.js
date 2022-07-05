async function ban(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ban"){
    const member = await interaction.options.getUser("user");
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

    if(days){
      member.ban({reason:`${reason}`,deleteMessageDays: `${days}`})
        .then(()=>interaction.reply({
          content:`${interaction.member}`,
          embeds:[{
            author: {
              name: `${member.user.tag}をサーバーからBANしました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        }))
        .catch(()=>interaction.reply({
          embeds:[{
            author: {
              name: "メンバーをBANできませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "BOTの権限が不足しているか、メンバーが正しく指定されていません\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
          }],
          ephemeral:true
        }))
    }else{
      member.ban({reason:`${reason}`})
        .then(()=>interaction.reply({
          content:`${interaction.member}`,
          embeds:[{
            author: {
              name: `${member.user.tag}をサーバーからBANしました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        }))
        .catch(()=>interaction.reply({
          embeds:[{
            author: {
              name: "メンバーをBANできませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "BOTの権限が不足しているか、メンバーが正しく指定されていません\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
          }],
          ephemeral:true
        }))
    }
    return;
  }
}
  
module.exports = ban