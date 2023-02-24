module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  const { MessageButton, MessageActionRow } = require("discord.js");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "news"){
    
    const data = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_KEY}`)
      .then(res=>res.json())
      .catch(()=>{})

    const before = new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("前")
      .setCustomId("news_0")

    const next = new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("次")
      .setCustomId("news_1")

    const page = new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("1ページ")
      .setCustomId("news")
      .setDisabled(true)
    
    try{
      await interaction.reply({
        embeds:[{
          title: data.articles[0].title,
          url: data.articles[0].url,
          color: "GREEN",
          description: data.articles[0].description,
          image:{
            url: data.articles[0].urlToImage
          },
          footer:{
            text: `${data.articles[0].publishedAt} | ${data.articles[0].source.name}`
          },
        }],
        components:[
          new MessageActionRow()
            .addComponents(before)
            .addComponents(page)
            .addComponents(next)
        ]
      })
    }catch{
      await interaction.reply({
        embeds:[{
          author:{
            name: "ページが存在しません",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "前のページに戻ってください"
        }],
        components:[
          new MessageActionRow()
            .addComponents(before)
            .addComponents(page)
            .addComponents(next)
        ]
      })
    }
  }
}