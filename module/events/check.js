async function check(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("check_")){
    const role = interaction.customId.match(/\d{18}/);
    const code = interaction.fields.getTextInputValue('code');
    if(code == `21`){
      await interaction.member.roles.add(role)
        .then(()=>{interaction.reply({content: "認証しました",ephemeral: true})})
        .catch(()=>{interaction.reply({content: "認証に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m",ephemeral: true})})
    }else{
      await interaction.reply("入力コードが間違っています")
    }
    return;
  }
}

module.exports = check