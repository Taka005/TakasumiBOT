module.exports = async(message)=>{
  const mysql = require("../lib/mysql.js");
  if(message.author.bot) return;

  let data = await mysql(`SELECT * FROM afk WHERE user = ${message.author.id} LIMIT 1;`);
  if(data[0]){
    await mysql(`DELETE FROM afk WHERE user = ${message.author.id} LIMIT 1;`);
    const time = new Date() - new Date(data[0].time);
    return message.channel.send({
      embeds:[{
        author: {
          name: "AFKを無効にしました",
          icon_url: "https://cdn.taka.ml/images/system/success.png",
        },
        color: "GREEN",
        description: `メンションは${data[0].mention}件ありました\n${Math.floor(time/1000)}秒間AFKでした`
      }]
    }); 
  }

  const mention = message.content.match(/<@\d{18,19}>/g);
  if(mention[0]){
    const id = mention[0].match(/\d{18,19}/g);
    data = await mysql(`SELECT * FROM afk WHERE user = ${id[0]} LIMIT 1;`);
    if(data[0]){
      await mysql(`UPDATE afk SET mention = ${Number(data[0].mention)+1} WHERE user = ${id[0]}`);
      message.channel.send({
        embeds:[{
          author: {
            name: "AFK中です",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: data[0].message
        }]
      }); 
    }
  }
}