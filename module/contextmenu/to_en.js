async function to_en(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "英語に翻訳"){
    const message = await interaction.options.getMessage("message");
    if(!message.content) return await await interaction.reply({
      content:`[翻訳元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)`,
      embeds:[{
        author: {
          name: "翻訳できませんでした",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        thumbnail: {
          url: "https://cdn.taka.ml/images/translate.png"
        },
        color: "RED",
        description: "メッセージの内容が存在しません",
        footer: {
          text:`Google Translate`
        }
      }],
      ephemeral:true
    });

    if(message.content > 3000) return await interaction.reply({
      content:`[翻訳元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)`,
      embeds:[{
        author: {
          name: "翻訳できませんでした",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        thumbnail: {
          url: "https://cdn.taka.ml/images/translate.png"
        },
        color: "RED",
        description: "翻訳文字数は、3000文字以下です",
        footer: {
          text:`Google Translate`
        }
      }],
      ephemeral:true
    });
      
    const translate_data = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&dj=1&q=${encodeURIComponent(message.content)}`)
      .then(res => res.json())
      .catch(()=>{})
    
    try{
      const translated = translate_data.sentences.map((sentence)=>{
        return sentence.trans
      });

      await interaction.reply({
        content:`[翻訳元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)`,
        embeds:[{
          title: "翻訳結果",
          color: "BLUE",    
          thumbnail: {
            url: "https://cdn.taka.ml/images/translate.png"
          },
          description: translated.join(""),
          footer: {
            text:`Google Translate [${translate_data.src}]->[en]`
          }
        }]
      });
    }catch{
      await interaction.reply({
        content:`[翻訳元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)`,
        embeds:[{
          author: {
            name: "翻訳できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.jpg",
          },
          thumbnail: {
            url: "https://cdn.taka.ml/images/translate.png"
          },
          color: "RED",
          description: "翻訳文字を変えて、もう一度実行してください",
          footer: {
            text:`Google Translate`
          }
        }],
        ephemeral:true
      });
    }
  }
}
    
module.exports = to_en