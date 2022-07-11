async function news(interaction){
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "news"){
    await interaction.deferReply()
    const news_response = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_KEY}`);
    const news_data = await news_response.json();

    for(let i=0;i<news_data.totalResults;i++){
      setTimeout(async()=>{
        await interaction.editReply({
          embeds:[{
            title: news_data.articles[i].title || null,
            url: news_data.articles[i].url || null,
            color: "WHITE",
            description: news_data.articles[i].description || null,
            image: {
              url: news_data.articles[i].urlToImage || null
            },
            footer: {
              text: `${news_data.articles[i].publishedAt || null} | ${news_data.articles[i].source.name || null}`
            },
          }]
        });
      },5000);
    }
    return;
  }
}

module.exports = news