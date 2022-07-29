async function support(interaction){
  const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "support"){
    const count_1 = Math.floor(Math.random() * 15) + 1;
    const count_2 = Math.floor(Math.random() * 15) + 1;
    const total = count_1 + count_2
    const support_modal = new Modal()
    .setCustomId(`support_${total}`)
    .setTitle('サポート');

    const content = new TextInputComponent()
      .setCustomId("content")
      .setLabel("バグ、質問等をご記入ください")
      .setPlaceholder('内容は、サポートサーバーに送信されます')
      .setRequired(true)
      .setMaxLength(300)
      .setStyle('PARAGRAPH');
    const code = new TextInputComponent()
      .setCustomId(`code`)
      .setLabel(`確認:${count_1}+${count_2}の答えを入力してください`)
      .setMaxLength(6)
      .setPlaceholder('半角で入力してください')
      .setRequired(true)
      .setStyle('SHORT');

    support_modal.addComponents(
      new MessageActionRow()
        .addComponents(content),
      new MessageActionRow()
        .addComponents(code),
    );
    
    await interaction.showModal(support_modal);
    return;
  }
}
  
  module.exports = support