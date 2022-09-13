async function embed(interaction){
  const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "embed"){
    const embed = new Modal()
      .setCustomId("embed")
      .setTitle("埋め込み作成");

    const title = new TextInputComponent()
      .setCustomId("title")
      .setLabel("タイトル")
      .setPlaceholder("埋め込みに表示されるタイトル")
      .setMaxLength(100)
      .setStyle("SHORT");

    const description = new TextInputComponent()
      .setCustomId("description")
      .setLabel("説明")
      .setMaxLength(800)
      .setPlaceholder("埋め込みに表示される説明欄")
      .setStyle("PARAGRAPH");
      
    const image = new TextInputComponent()
      .setCustomId("image")
      .setLabel("画像")
      .setPlaceholder("埋め込みに表示される画像のURL")
      .setMaxLength(120)
      .setStyle("SHORT");
      
    embed.addComponents(
      new MessageActionRow()
        .addComponents(title),
      new MessageActionRow()
        .addComponents(description),
      new MessageActionRow()
        .addComponents(image)
    );
    
    await interaction.showModal(embed);
    return;
  }
}

module.exports = embed