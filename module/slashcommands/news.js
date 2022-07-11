async function news(interaction){
  async function sleep(waitSec, callback) {
    setTimeout(callback, waitSec);
  };

  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "news"){
    const news_response = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_KEY}`);
    const news_data = await news_response.json();

    await interaction.deferReply()
    for(let i=0;i<news_data.totalResults;i++){
      sleep(8000,async function () {
        await interaction.editReply({
          embeds:[{
            title: news_data.articles[i].title,
            url: news_data.articles[i].url,
            color: "WHITE",
            description: news_data.articles[i].description,
            image: {
              url: news_data.articles[i].urlToImage
            },
            footer: {
              text: `${news_data.articles[i].publishedAt} | ${news_data.articles[i].source.name}`
            },
          }]
        });
      });
    }
    return;
  }
}

module.exports = news