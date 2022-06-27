async function auth_event(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("auth_")){
    const role = interaction.customId.match(/\d{18}/);
    await interaction.member.roles.add(role)
      .then(()=>{interaction.reply({content: "認証しました",ephemeral: true})})
      .catch(()=>{interaction.reply({content: "認証に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m",ephemeral: true})})
    return;
  }
}

module.exports = auth_event