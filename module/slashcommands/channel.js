async function channel(interaction,client){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "channel"){
    const text = await interaction.options.getString("text");
    const channel = await interaction.options.getChannel("channel");

    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content:`channelを使うには「メッセージ管理」の権限が必要です`,ephemeral:true });
    try{
      await client.channels.cache.get(channel.id).send(`${text}`)
        .then(()=>interaction.reply({ content:`正常に送信しました`,ephemeral:true }))
    }catch{
      interaction.reply({
        embeds:[{
          author: {
            name: "メッセージを正常に送信できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: `テキストチャンネルが指定されていないか、\nBOTの権限が不足しています`
        }],
        ephemeral:true
      })
    }
    return;
  }
}
  
module.exports = channel