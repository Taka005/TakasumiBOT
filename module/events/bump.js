module.exports = async(message)=>{
  const mysql = require("../lib/mysql.js");

  if(message.author.id === "302050872383242240"){
    if(
      message.embeds[0]?.description.match(/表示順をアップしたよ/)||
      message.embeds[0]?.description.match(/Bump done/)
    ){
      const data = await mysql(`SELECT * FROM bump WHERE server = ${message.guild.id} LIMIT 1;`);
      await message.channel.send({
        embeds:[{
          color: "WHITE",
          title:"BUMP通知",
          description:"UPを受信しました\n2時間後に通知します"
        }]  
      }).catch(()=>{})

      if(data){
        setTimeout(async()=>{
          await message.channel.send({
            content: `<@&${data}>`,
            embeds:[{
              color: "WHITE",
              title:"BUMP通知",
              description:"BUMPの時間です\n`/bump`でサーバーの表示順位を上げよう！"
            }]  
          }).catch(()=>{})
        },60000 * 120)
      }else{
        setTimeout(async()=>{
          await message.channel.send({
            embeds:[{
              color: "WHITE",
              title:"BUMP通知",
              description:"BUMPの時間です\n`/bump`でサーバーの表示順位を上げよう！"
            }]  
          }).catch(()=>{})
        },60000 * 120)
      }
    }
  }
}