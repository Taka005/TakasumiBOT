async function to_en(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "英語に翻訳"){
    const message = await interaction.options.getMessage("message");
    if(!message.content) return await await interaction.reply({
      content:`[翻訳元](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${message.id}/)`,
      embeds:[{
        author: {
          name: "翻訳できませんでした",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        thumbnail: {
          url: "https://taka.ml/images/translate.png"
        },
        color: "RED",
        description: "メッセージの内容が存在しません",
        footer: {
          text:`Google Translate`
        }
      }],
      ephemeral:true
    });

    if(message.content > 3000) return await await interaction.reply({
      content:`[翻訳元](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${message.id}/)`,
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
      
    const translate_data = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&dj=1&q=${encodeURIComponent(message.content)}`)
      .then(res => res.json())
      .catch(()=>{})
    
    try{
      await interaction.reply({
        content:`[翻訳元](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${message.id}/)`,
        embeds:[{
          title: "翻訳結果",
          color: "BLUE",    
          thumbnail: {
            url: "https://taka.ml/images/translate.png"
          },
          description: translate_data.sentences[0].trans,
          footer: {
            text:`Google Translate [${translate_data.src}]->[en]`
          }
        }]
      });
    }catch{
      await interaction.reply({
        content:`[翻訳元](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${message.id}/)`,
        embeds:[{
          author: {
            name: "翻訳できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          thumbnail: {
            url: "https://taka.ml/images/translate.png"
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
    return;
  }
}
    
module.exports = to_en