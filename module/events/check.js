async function check(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("check_")){
    const list = interaction.customId.split("_");
    const code = interaction.fields.getTextInputValue('code');
    if(isNaN(code)) return interaction.reply({content: `入力欄は空白、又は数字以外には出来ません`,ephemeral: true})
    if(code == list[2]){
      await interaction.member.roles.add(list[1])
        .then(()=>{interaction.reply({content: "認証しました",ephemeral: true})})
        .catch(()=>{interaction.reply({content: "認証に失敗しました...\nbotの権限、またはロールがしっかりと設定されてることを確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m",ephemeral: true})})
    }else{
      await interaction.reply({content: `入力したコードが間違っています[答え:${list[2]}]`,ephemeral: true})
    }
    return;
  }
}

module.exports = check