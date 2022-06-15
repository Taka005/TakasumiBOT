async function embed_command(interaction){
  const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === 'embed'){
    const embed = new Modal()
      .setCustomId(`embed`)
      .setTitle('埋め込み作成');

    const author = new TextInputComponent()
      .setCustomId("author")
      .setLabel("著者")
      .setPlaceholder('埋め込みに表示される著者名')
      .setMaxLength(50)
      .setStyle('SHORT');
    const title = new TextInputComponent()
      .setCustomId("title")
      .setLabel("タイトル")
      .setPlaceholder('埋め込みに表示されるタイトル')
      .setMaxLength(80)
      .setStyle('SHORT');
    const description = new TextInputComponent()
      .setCustomId(`description`)
      .setLabel(`説明`)
      .setMaxLength(500)
      .setPlaceholder('埋め込みに表示される説明欄')
      .setStyle('SHORT');
    const image = new TextInputComponent()
      .setCustomId(`image`)
      .setLabel(`画像`)
      .setPlaceholder('埋め込みに表示される画像のURL')
      .setMaxLength(120)
      .setStyle('SHORT');
    embed.addComponents(new MessageActionRow().addComponents(author),new MessageActionRow().addComponents(title),new MessageActionRow().addComponents(description),new MessageActionRow().addComponents(image));
    
    await interaction.showModal(embed);
    return;
  }
}

module.exports = embed_command