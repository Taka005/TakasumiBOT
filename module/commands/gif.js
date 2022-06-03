async function gif(message){
  const config = require("../../config.json");
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(message.content.startsWith(`${config.prefix}gif`)){
    const gif = message.content.slice(5);
    const gif_response = await fetch(`https://g.tenor.com/v1/search?q=${gif}&key=${process.env.GIF_KEY}&limit=1&media_filter=minimal`);
    const gif_data = await gif_response.json();
    message.reply(gif_data.results[0].media[0].gif.url)
      .catch(()=>message.reply("GIFの取得に失敗しました..."))
  }
}

module.exports = gif