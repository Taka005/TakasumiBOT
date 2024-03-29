module.exports = async(interaction)=>{
  const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("panel_")){
    const role = interaction.customId.split("_");
    const count_1 = Math.floor(Math.random()*15) + 1;
    const count_2 = Math.floor(Math.random()*15) + 1;
    const total = count_1 + count_2

    const check = new Modal()
      .setCustomId(`panelrole_${role[1]}_${total}`)
      .setTitle("認証");

    const code = new TextInputComponent()
      .setCustomId("code")
      .setLabel(`${count_1}+${count_2}の答えを入力してください`)
      .setMaxLength(6)
      .setPlaceholder("半角で入力してください")
      .setRequired(true)
      .setStyle("SHORT");
      
    check.addComponents(new MessageActionRow().addComponents(code));

    await interaction.showModal(check);
  }
}