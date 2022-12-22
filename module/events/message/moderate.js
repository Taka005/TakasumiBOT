const time = [];

module.exports = async(message)=>{
  const ngword = require("../../../file/moderate/ngword.json");
  const mysql = require("../../lib/mysql");

  const data = await mysql(`SELECT * FROM moderate WHERE id = ${message.guild.id} LIMIT 1;`);
  if(data[0]){
    if(data[0].type === "high"){
      if(ngword.includes(message.content)){
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
      if(ngword.includes(message.content)){
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
      if(ngword.includes(message.content)){
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
    }
  }
}