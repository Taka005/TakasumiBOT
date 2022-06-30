async function panel(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "panel"){
    if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({ content:"panelを使うには「ロールの管理」の権限が必要です",ephemeral: true });       
      const role =  interaction.options.getRole("role");
      const auth_button = new MessageButton().setCustomId(`panel_${role.id}`).setStyle("PRIMARY").setLabel("認証");
        await interaction.channel.send({
          embeds: [{
            color:"BLUE",
              description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
            }],
            components: [new MessageActionRow().addComponents(auth_button)]
        });
  return;
  }
}

module.exports = panel