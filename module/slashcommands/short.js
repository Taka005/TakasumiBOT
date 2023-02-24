module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "short"){
    const url = interaction.options.getString("url");

    if(!url.match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g)) return await interaction.reply({
      embeds:[{
        author:{
          name: "短縮URLにできませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "URLを指定する必要があります"
      }],
      ephemeral: true
    });

    const data = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`)
      .then(res=>res.text())
      .catch(()=>{})
      
    await interaction.reply(data);
  }
}