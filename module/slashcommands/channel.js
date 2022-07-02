async function channel(interaction,client){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "channel"){
    const text = await interaction.options.getString("text");
    const channel = await interaction.options.getChannel("channel");

    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content:`channelを使うには「メッセージ管理」の権限が必要です`,ephemeral:true });
    if(!channel.type == "GUILD_TEXT") return interaction.reply({ content:`テキストチャンネル以外は送信できません`,ephemeral:true })
    client.channels.cache.get(channel.id).send(`${text}`)
      .then(()=>interaction.reply({ content:`正常に送信しました`,ephemeral:true }))
      .catch(()=>interaction.reply({ content:`正常に送信が出来ませんでした`,ephemeral:true }))
    return;
  }
}
  
module.exports = channel