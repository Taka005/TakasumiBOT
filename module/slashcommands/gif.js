async function gif(interaction){
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "gif"){
    const gif = interaction.options.getString("name");
    const gif_response = await fetch(`https://g.tenor.com/v1/search?q=${gif}&key=${process.env.GIF_KEY}&limit=1&media_filter=minimal`);
    const gif_data = await gif_response.json();
    interaction.reply(gif_data.results[0].media[0].gif.url)
      .catch(()=>interaction.reply({ content:"GIFの取得に失敗しました...", ephemeral: true }))
    return;
  }
}

module.exports = gif