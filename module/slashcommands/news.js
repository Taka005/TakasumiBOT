async function news(interaction){
  const { setTimeout } = require('node:timers/promises');
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "news"){
    await interaction.deferReply()
    const news_response = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_KEY}`);
    const news_data = await news_response.json();

    for(let i=0;i<news_data.totalResults;i++){
      await interaction.editReply({
        embeds:[{
          title: news_data.articles[i].title,
          url: news_data.articles[i].url,
          color: "WHITE",
          description: news_data.articles[i].description ,
          image: {
            url: news_data.articles[i].urlToImage
          },
          footer: {
            text: `${news_data.articles[i].publishedAt} | ${news_data.articles[i].source.name}`
          },
        }]
      }).catch(()=>{})

      await setTimeout(4000);
    }
    return;
  }
}

module.exports = news