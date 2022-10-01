async function guideline_event(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("guideline_")){
    const role = interaction.customId.split("_");
    const temp = interaction.fields.getTextInputValue("temp");

    const guide_button = new MessageButton()
      .setCustomId(`guide_${role[1]}`)
      .setStyle("SECONDARY")
      .setLabel("同意します")

    await interaction.channel.send({
      embeds:[{
        color: "GREEN",
        title:"このサーバーのガイドライン",
        description: `${temp}`,
        thumbnail: {
          url: "https://cdn.taka.ml/images/guideline.png"
        }
      },
      {
        color:"GREEN",
        description: "続行するにはこのサーバーのガイドラインを守る必要があります。\n[Discord コミュニティガイドライン](https://discord.com/guidelines) も忘れないようにして下さい。"
      }],
      components: [new MessageActionRow().addComponents(guide_button)]
    })
    .then(()=>{
      interaction.deferUpdate({});
    })
    .catch(()=>{
      interaction.reply({ 
        embeds:[{
          author: {
            name: "ガイドライン機能の作成に失敗しました",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "BOTの権限等を確認し、もう一度実行してください\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
        }], 
        ephemeral: true 
        });
    })
  }
}
  
module.exports = guideline_event