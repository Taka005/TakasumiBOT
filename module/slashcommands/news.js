async function news(interaction){
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "news"){
    await interaction.deferReply()
    const news_response = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_KEY}`);
    const news_data = await news_response.json();

    await interaction.reply({
      embeds:[{
        title: news_data.articles[0].title,
        url: news_data.articles[0].url,
        color: "WHITE",
        description: news_data.articles[0].description,
        image: {
          url: news_data.articles[0].urlToImage
        },
        footer: {
          text: `${news_data.articles[0].publishedAt} | ${news_data.articles[0].source.name}`
        },
      }]
    })
    return;
  }
}

module.exports = news