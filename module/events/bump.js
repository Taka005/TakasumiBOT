function bump(message){
  const config = require("../../config.json");

  function sleep(waitSec, callback) {
    setTimeout(callback, waitSec);
  };
  if(message.author.id == "302050872383242240") {
    if(message.embeds[0].description.match(/表示順をアップしたよ/) ||message.embeds[0].description.match(/Bump done/)){
      message.channel.send({
        embeds:[{
          color: "WHITE",
          title:"BUMP通知",
          description:"UPを受信しました\n2時間後に通知します"
        }]  
      });

      sleep(60000 * 120, function () {
        message.channel.send(`${config.bump}`);
        message.channel.send({
          content: `||${config.bump}||`,
          embeds:[{
            color: "WHITE",
            title:"BUMP通知",
            description:"BUMPの時間です\n`/bump`でサーバーの表示順位を上げよう！"
          }]  
        });
      });
    }
  }
}

module.exports = bump