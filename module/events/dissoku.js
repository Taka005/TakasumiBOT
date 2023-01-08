module.exports = async(message)=>{
  const mysql = require("../lib/mysql");

  if(message.author.id === "761562078095867916"){
    if(
      message.embeds[0]?.fields[0].name.match(/をアップしたよ/)||
      message.embeds[0]?.fields[0].name.match(/I've bumped up/)
    ){
      const data = await mysql(`SELECT * FROM dissoku WHERE server = ${message.guild.id} LIMIT 1;`);
      await message.channel.send({
        embeds:[{
          color: "BLUE",
          title:"UP通知",
          description:"UPを受信しました\n1時間後に通知します"
        }]  
      }).catch(()=>{})

      if(data[0]){
        setTimeout(async()=>{
          await message.channel.send({
            content: `<@&${data[0].role}>`,
            embeds:[{
              color: "BLUE",
              title:"UP通知",
              description:"DISSOKUの時間です\n`/dissoku up`でサーバーの表示順位を上げよう！"
            }]  
          }).catch(()=>{})
        },60000 * 60)
      }else{
        setTimeout(async()=>{
          await message.channel.send({
            embeds:[{
              color: "BLUE",
              title:"UP通知",
              description:"DISSOKUの時間です\n`/dissoku up`でサーバーの表示順位を上げよう！"
            }]  
          }).catch(()=>{})
        },60000 * 60)
      }
    }
  }
}