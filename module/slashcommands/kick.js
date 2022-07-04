async function kick(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "kick"){
    const user = await interaction.options.getString("user");
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

    const id = user.match(/\d{18}/g);
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
    member.kick(reason)
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