const time = [];

module.exports = async(message)=>{
  const ngword = require("../../../file/moderate/ngword.json");
  const mysql = require("../../lib/mysql");

  if(
    message.author.bot||
    !message.guild.me.permissionsIn(message.channel)?.has("VIEW_CHANNEL")||
    !message.guild.me.permissionsIn(message.channel)?.has("SEND_MESSAGES")||
    !message.guild.me.permissionsIn(message.channel)?.has("MANAGE_MESSAGES")
  ) return;

  const data = await mysql(`SELECT * FROM moderate WHERE id = ${message.guild.id} LIMIT 1;`);
  if(data[0]){
    if(!time[message.author.id]){
      time[message.author.id] = [null,true];
    }
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
      if(ngword.high.find(e=>message.content.match(e))){
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
      //スパム検知
      if(new Date() - time[message.author.id][0] <= 1200){
        message.delete().catch(()=>{});
        if(!time[message.author.id][1]) return;
        message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
            },
            description: "スパムを検知したため、メッセージを削除しました",
            timestamp: new Date(),
            color: "YELLOW"
          }]
        }).catch(()=>{})
        return time[message.author.id] = [new Date(),false];
      }else{
        time[message.author.id] = [new Date(),true];
      }
    }else if(data[0].type === "normal"){
      //文字数制限
      if(message.content.length > 1200){
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
      if(ngword.high.find(e=>message.content.match(e))){
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
      //スパム検知
      if(new Date() - time[message.author.id][0] <= 1000){
        message.delete().catch(()=>{});
        if(!time[message.author.id][1]) return;
        message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
            },
            description: "スパムを検知したため、メッセージを削除しました",
            timestamp: new Date(),
            color: "YELLOW"
          }]
        }).catch(()=>{})
        return time[message.author.id] = [new Date(),false];
      }else{
        time[message.author.id] = [new Date(),true];
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
      //スパム検知
      if(new Date() - time[message.author.id][0] <= 600){
        message.delete().catch(()=>{});
        if(!time[message.author.id][1]) return;
        message.channel.send({
          embeds:[{
            author: {
              name: "自動モデレート",
              icon_url: "https://cdn.taka.ml/images/system/warn.png"
            },
            description: "スパムを検知したため、メッセージを削除しました",
            timestamp: new Date(),
            color: "YELLOW"
          }]
        }).catch(()=>{})
        return time[message.author.id] = [new Date(),false];
      }else{
        time[message.author.id] = [new Date(),true];
      }
    }
  }
}