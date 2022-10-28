async function channel(interaction,client){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "channel"){
    const text = await interaction.options.getString("text");
    const channel = await interaction.options.getChannel("channel");

    if(
      !interaction.member.permissions.has("MANAGE_MESSAGES")||
      !interaction.member.permissions.has("MANAGE_ROLES")||
      !interaction.member.permissions.has("MANAGE_CHANNELS")
    ) return interaction.reply({
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

    await client.channels.cache.get(channel.id).send(`${text}`)
      .then(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: `${channel.name}に${text}を送信しました`,
              icon_url: "https://cdn.taka.ml/images/success.png",
            },
            color: "GREEN"
          }],
          ephemeral:true
        })
      })
      .catch((error)=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "正常に送信できませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: `テキストチャンネルが指定されていないか、\nBOTの権限が不足しています`,
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          ephemeral:true
        });
      })
  }
}
  
module.exports = channel