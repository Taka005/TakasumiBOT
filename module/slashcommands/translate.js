async function translate(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "translate"){
    const text = await interaction.options.getString("text");
    const lang = await interaction.options.getString("lang");
    const translate_data = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&dj=1&q=${encodeURIComponent(text)}`)
      .then(res => res.json())
      .catch(()=>{})
  
    try{
      await interaction.reply({
        embeds:[{
          title: "翻訳結果",
          coslor: "BLUE",
          description: translate_data.sentences[0].trans,
          footer: {
            text:`Google Translate [${src}]->[${lang}]`,
            icon_url:"https://taka.ml/images/translate.png"
          }
        }]
      });
    }catch{
      await interaction.reply({
        embeds:[{
          author: {
            name: "翻訳できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "翻訳文字を変えて、もう一度実行してください",
          footer: {
            text:`Google Translate`,
            icon_url:"https://taka.ml/images/translate.png"
          }
        }],
        ephemeral:true
      });
    }
    return;
  }
}
  
module.exports = translate