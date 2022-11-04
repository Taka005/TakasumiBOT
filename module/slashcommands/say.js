module.exports = async(interaction)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "say"){
    const text = await interaction.options.getString("text");

    if(
      !interaction.member.permissions.has("MANAGE_MESSAGES")||
      !interaction.member.permissions.has("MANAGE_ROLES")||
      !interaction.member.permissions.has("MANAGE_CHANNELS")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```メッセージを管理\nロールの管理\nチャンネルの管理```"
      }],
      ephemeral:true
    });

    await interaction.channel.send(`${text}`)
      .then(()=>{
        interaction.deferReply()
          .then(()=>{
            interaction.deleteReply()
          })
      })
      .catch(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "権限が不足しています",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: `BOTの権限をを変更し、もう一度実行してください`
          }],
          ephemeral:true
        })
      });
  }
}