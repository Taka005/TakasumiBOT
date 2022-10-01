async function wiki(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "wiki"){
    const wiki_name = await interaction.options.getString("name");
    const wiki_data = await fetch(`https://ja.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki_name)}`)
      .then(res => res.json())
      .catch(()=>{})

    try{
      await interaction.reply({
        embeds:[{
          title: wiki_data.title,
          url: wiki_data.content_urls.desktop.page,
          color: "GREEN",
          description: wiki_data.extract,
          footer: {
            text: "TakasumiBOT"
          }
        }]
      });
    }catch{
      await interaction.reply({
        embeds:[{
          author: {
            name: "検索内容を取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "検索ワードを変えて、もう一度実行してください"
        }],
        ephemeral:true
      });
    }
  }
}

module.exports = wiki