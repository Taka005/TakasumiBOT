async function auth(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("auth_")){
    const role = interaction.customId.match(/\d{18}/);
    if(interaction.member.roles.cache.has(role)) return await interaction.reply({content: "既に役職を付与済みです",ephemeral: true});
    if(interaction.member.roles.cache.get(role)) return await interaction.reply({content: "設定されたロールが無効です",ephemeral: true});
    await interaction.member.roles.add(role)
      .then(()=>{interaction.reply({content: "認証しました",ephemeral: true})})
      .catch(()=>{interaction.reply({content: "認証に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m",ephemeral: true})})
    return;
  }
}

module.exports = auth