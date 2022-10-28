async function auth(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "auth"){
    if(!interaction.member.permissions.has("MANAGE_ROLES")) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`ロールの管理`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

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
      .then(async()=>{
        interaction.deferReply()
          .then(()=>{
            interaction.deleteReply()
          })
      })
      .catch(async(error)=>{
        await interaction.reply({ 
          embeds:[{
            author: {
              name: "認証機能の作成に失敗しました",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "BOTの権限等を確認し、もう一度実行してください",
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }], 
          ephemeral: true 
        });
      })
  }
}

module.exports = auth