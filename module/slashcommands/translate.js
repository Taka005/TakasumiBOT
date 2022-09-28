async function translate(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "translate"){
    const text = await interaction.options.getString("text");
    const lang = await interaction.options.getString("lang");
    if(text > 3000) return await await interaction.reply({
      embeds:[{
        author: {
          name: "翻訳できませんでした",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        thumbnail: {
          url: "https://taka.ml/images/translate.png"
        },
        color: "RED",
        description: "翻訳文字数は、3000文字以下です",
        footer: {
          text:`Google Translate`
        }
      }],
      ephemeral:true
    });
    
    const translate_data = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&dj=1&q=${encodeURIComponent(text)}`)
      .then(res => res.json())
      .catch(()=>{})
  
    try{
      const translated = translate_data.sentences.map((sentence)=>{
        return sentence.trans
      });

      await interaction.reply({
        embeds:[{
          title: "翻訳結果",
          color: "BLUE",    
          thumbnail: {
            url: "https://taka.ml/images/translate.png"
          },
          description: translated.join(""),
          footer: {
            text:`Google Translate [${translate_data.src}]->[${lang}]`
          }
        }]
      });
    }catch(error){
      await interaction.reply({
        embeds:[{
          author: {
            name: "翻訳できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          thumbnail: {
            url: "https://taka.ml/images/translate.png"
          },
          color: "RED",
          description: "翻訳文字を変えて、もう一度実行してください"+error,
          footer: {
            text:`Google Translate`
          }
        }],
        ephemeral:true
      });
    }
    return;
  }
}
  
module.exports = translate