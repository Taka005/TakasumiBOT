module.exports = async(interaction)=>{
  const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "guideline"){ 
    const role =  interaction.options.getRole("role");

    if(!interaction.member.permissions.has("MANAGE_ROLES")) return await interaction.reply({
      embeds:[{
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`ロールの管理`の権限を持っている必要があります"
      }],
      ephemeral: true
    });

    const guide = new Modal()
      .setCustomId(`guideline_${role.id}`)
      .setTitle("ガイドライン作成");

    const temp = new TextInputComponent()
      .setCustomId("temp")
      .setLabel("テンプレートを編集してガイドラインを作成してください")
      .setMaxLength(3000)
      .setRequired(true)
      .setValue("` 1 ` **１つ目のガイドライン**\n\n` 2 ` **２つ目のガイドライン**\n\n` 3 ` **３つ目のガイドライン**\n\n` 4 ` **４つ目のガイドライン**\n")
      .setStyle("PARAGRAPH");
      
    guide.addComponents(new MessageActionRow().addComponents(temp));
  
    await interaction.showModal(guide);
  }
}