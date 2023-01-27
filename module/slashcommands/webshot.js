module.exports = async(interaction)=>{
  const isUrl = require("../lib/isUrl");
  const fetch = require("node-fetch");
  const { MessageAttachment, MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "webshot"){
    const url = interaction.options.getString("url");

    if(!isUrl(url)) return await interaction.reply({
      embeds:[{
        author: {
          name: "スクリーンショットできませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "URLを指定する必要があります"
      }],
      ephemeral:true
    });

    await interaction.deferReply();
    try{
      const shot = await fetch(`https://api.popcat.xyz/screenshot?url=${url}`)
        .then(res=>res.blob())

      await interaction.editReply({
        embeds:[{
          author: {
            name: "スクリーンショットを撮りました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          image: {
            url: "attachment://screenshot.png"
          },
        }],
        files: [new MessageAttachment(shot.stream(),"screenshot.png")]
      });
      
    }catch(error){
      await interaction.editReply({
        embeds:[{
          author: {
            name: "スクリーンショットできませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],
        components: [
          new MessageActionRow()
            .addComponents( 
              new MessageButton()
                .setLabel("サポートサーバー")
                .setURL("https://discord.gg/NEesRdGQwD")
                .setStyle("LINK")
            )
        ],
        ephemeral:true
      });
    }
  }
}