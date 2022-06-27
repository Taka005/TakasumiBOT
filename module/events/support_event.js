async function support_event(interaction,client){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("support_")){
    const list = interaction.customId.split("_");
    const code = interaction.fields.getTextInputValue('code');
    const content = interaction.fields.getTextInputValue('content');
    if(isNaN(code)) return interaction.reply({content: `認証欄は空白、又は数字以外には出来ません\nもう一度、入力してください`,ephemeral: true})
    if(code == list[1]){
      client.channels.cache.get("986249483098673222").send({
        embeds:[{
          color: "WHITE",
          author: {
            name: `${interaction.member.id}`
           },
          description: content,
          timestamp: new Date()
        }]
      });
      await interaction.reply({content: "正常にサポートサーバーに送信されました\nご報告ありがとうございました\nサポートサーバー:https://discord.gg/GPs3npB63m",ephemeral: true})
    }else{
      await interaction.reply({content: `入力したコードが間違っています\nもう一度、入力してください`,ephemeral: true})
    }
    return;
  }
}

module.exports = support_event