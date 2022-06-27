async function auth(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "auth"){
    if (!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({ content:"authを使うには「ロールの管理」の権限が必要です",ephemeral: true });         
      const role =  interaction.options.getRole("role");
        const auth_button = new MessageButton().setCustomId(`auth_${role.id}`).setStyle("PRIMARY").setLabel("認証");
          await interaction.channel.send({
              embeds: [{
                color:"WHITE",
                description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
              }],
              components: [new MessageActionRow().addComponents(auth_button)]
          });
    return;
  }  
}

module.exports = auth