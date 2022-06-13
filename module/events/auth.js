async function auth(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("auth_")){
    if(Date.now() - interaction.member.createdTimestamp < 1000*60*60*24*10) return interaction.reply({content: "認証するにはアカウントが作成されてから、\n10日が経っている必要があります",ephemeral: true});
    const role = interaction.customId.match(/\d{18}/);
    await interaction.member.roles.add(role)
      .then(()=>{interaction.reply({content: "認証しました",ephemeral: true})})
      .catch(()=>{interaction.reply({content: "認証に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m",ephemeral: true})})
    return;
  }
}

module.exports = auth