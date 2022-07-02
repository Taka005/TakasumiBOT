async function auth(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "auth"){
    if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({ content:"authを使うには「ロールの管理」の権限が必要です",ephemeral: true });         
      const role =  await interaction.options.getRole("role");
        const auth_button = new MessageButton()
          .setCustomId(`auth_${role.id}`)
          .setStyle("PRIMARY")
          .setLabel("認証")
          
          await interaction.channel.send({
              embeds: [{
                color:"WHITE",
                description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
              }],
              components: [new MessageActionRow().addComponents(auth_button)]
          })
          .then(()=>interaction.deferReply()
            .then(()=>interaction.deleteReply())
          )
          .catch(()=>interaction.reply({ 
            embeds:[{
              author: {
                name: "認証機能の作成に失敗しました",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: "BOTの権限等を確認し、もう一度実行してください\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
            }], 
            ephemeral: true 
          }))

    return;
  }
}

module.exports = auth