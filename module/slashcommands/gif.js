module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  const { MessageAttachment } = require("discord.js");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "gif"){
    const name = await interaction.options.getString("name");

    await interaction.deferReply();
    try{
      const gif_res = await fetch(`https://g.tenor.com/v1/search?q=${name}&key=${process.env.GIF_KEY}&limit=1&media_filter=minimal`)
        .then(res=>res.json());

      const gif_data = await fetch(gif_data.results[0].media[0].gif.url)
        .then(res=>res.blob());

      await interaction.editReply({
        embeds:[{
          author: {
            name: "GIFを取得しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          image: {
            url: "attachment://gif.png"
          },
        }],
        files: [new MessageAttachment(gif_data.stream(),"gif.png")]
      });
    }catch(error){
      await interaction.reply({
        embeds:[{
          author: {
            name: "GIFが取得できませんでした",
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
        ephemeral:true
      })
    }
  }
}