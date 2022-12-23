const time = [];

module.exports = async(message)=>{
  const ngword = require("../../../file/moderate/ngword.json");
  const mysql = require("../../lib/mysql");

  const data = await mysql(`SELECT * FROM moderate WHERE id = ${message.guild.id} LIMIT 1;`);
  if(data[0]){
    if(data[0].type === "high"){
      //文字数制限
      if(message.content.length > 1000){
        message.delete().catch(()=>{});
        return message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
              },
              description: "メッセージの文字数が多すぎたため、メッセージを削除しました",
              timestamp: new Date(),
              color: "YELLOW"
            }]
        }).catch(()=>{})
      }
      //NGワード検知
      if(ngword.high.find(e=>e.includes(message.content))){
        message.delete().catch(()=>{});
        return message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
              },
              description: "NGワードを検知したため、メッセージを削除しました",
              timestamp: new Date(),
              color: "YELLOW"
            }]
        }).catch(()=>{})
      }
    }else if(data[0].type === "normal"){
      //文字数制限
      if(message.content.length > 1300){
        message.delete().catch(()=>{});
        return message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
              },
              description: "メッセージの文字数が多すぎたため、メッセージを削除しました",
              timestamp: new Date(),
              color: "YELLOW"
            }]
        }).catch(()=>{})
      }
      //NGワード検知
      if(ngword.low.find(e=>e.includes(message.content))){
        message.delete().catch(()=>{});
        return message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
            },
            description: "NGワードを検知したため、メッセージを削除しました",
            timestamp: new Date(),
            color: "YELLOW"
          }]
        }).catch(()=>{})
      }
    }else if(data[0].type === "low"){
      //文字数制限
      if(message.content.length > 1800){
        message.delete().catch(()=>{});
        return message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
              },
              description: "メッセージの文字数が多すぎたため、メッセージを削除しました",
              timestamp: new Date(),
              color: "YELLOW"
            }]
        }).catch(()=>{})
      }
    
    }
  }
}