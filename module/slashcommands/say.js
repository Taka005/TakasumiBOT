module.exports = async(interaction)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "say"){
    const text = interaction.options.getString("text");

    if(
      !interaction.member.permissions.has("MANAGE_MESSAGES")||
      !interaction.member.permissions.has("MANAGE_ROLES")||
      !interaction.member.permissions.has("MANAGE_CHANNELS")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```メッセージを管理\nロールの管理\nチャンネルの管理```"
      }],
      ephemeral:true
    });

    await interaction.channel.send(`${text}`)
      .then(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "正常に送信しました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN",
            description: "このコマンドによるメッセージに関するトラブル等に関して運営は一切責任を負いません\nまた、運営によって勝手にメッセージが送信される等もございませんので注意してください"
          }],
          ephemeral:true
        });
      })
      .catch(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "権限が不足しています",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: `BOTの権限をを変更し、もう一度実行してください`
          }],
          ephemeral:true
        })
      });
  }
}