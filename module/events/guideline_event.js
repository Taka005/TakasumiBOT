async function guideline_event(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("guideline_")){
    const role = interaction.customId.split("_");
    const temp = interaction.fields.getTextInputValue("temp");

    const guide_button = new MessageButton()
      .setCustomId(`guide_${role[1]}`)
      .setStyle("PRIMARY")
      .setLabel("同意します")

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        title:"このサーバーのガイドライン",
        description: `${temp}`,
        thumbnail: {
          url: "https://taka.ml/images/guideline.png"
        },
      },
      {
        color:"GREEN",
        description: "続行するにはこのサーバーのガイドラインを守る必要があります。\n[Discord コミュニティガイドライン](https://discord.com/guidelines) も忘れないようにして下さい。"
      }],
      components: [new MessageActionRow().addComponents(guide_button)]
    })
    return;
  }
}
  
module.exports = guideline_event