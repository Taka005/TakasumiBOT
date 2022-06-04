async function panel(interaction){
  const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("panel_")){
    const role = interaction.customId.match(/\d{18}/);
    if(interaction.member.roles.cache.get(role)) return await interaction.reply({content: "設定されたロールが無効です",ephemeral: true});
      const check = new Modal()
        .setCustomId(`check_${role}`)
        .setTitle('認証');

      const code = new TextInputComponent()
        .setCustomId('code')
        .setLabel("8+13の答えを入力してください")
        .setStyle('SHORT');
      check.addComponents(new MessageActionRow().addComponents(code));

      await interaction.showModal(check);
      return;
    }
}
  
module.exports = panel