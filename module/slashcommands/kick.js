async function kick(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "kick"){
    const member = await interaction.options.getUser("member");
    const reason = await interaction.options.getString("reason") || `${interaction.member.user.tag}によってKICKしました`;
    if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({
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
    member.kick({ reason: reason })
      .then(()=>interaction.reply({
        embeds:[{
          author: {
            name: `${member.user.tag}をサーバーからKICKしました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      }))
      .catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "メンバーをKICKできませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "GREEN",
          description: "BOTの権限が不足しているか、メンバーが正しく指定されていません"
        }],
        ephemeral:true
      }))
    return;
  }
}
  
module.exports = kick