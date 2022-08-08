async function short(interaction){
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "short"){
    const url = await interaction.options.getString("url");

    if(!url.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)) return await interaction.reply({
      embeds:[{
        author: {
          name: "短縮URLにできませんでした",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "URLを指定する必要があります"
      }],
      ephemeral:true
    });

    const short_response = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`)
      .then(res => res.text())
    await interaction.reply(`${short_response}`);
    return;
  }
}

module.exports = short