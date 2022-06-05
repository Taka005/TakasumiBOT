async function run(message){
  const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
  const config = require("../../config.json");
  if(message.content === `${config.prefix}run`){
    if(message.author.id !== `${config.admin}`) return message.reply("このコマンドは製作者専用です");
    const program = new Modal()
      .setCustomId(`program`)
      .setTitle('プログラム実行');

    const node = new TextInputComponent()
      .setCustomId(`node`)
      .setLabel(`javascript`)
      .setStyle('PARAGRAPH');
    program.addComponents(new MessageActionRow().addComponents(node));

    await interaction.showModal(program);
    return;
  } 
}

module.exports = run