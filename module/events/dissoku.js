async function dissoku(message){

  function sleep(waitSec, callback){
    setTimeout(callback, waitSec);
  };
  if(message.author.id == "761562078095867916"){
    if(message.embeds[0]?.fields[0].name.match(/をアップしたよ/)||message.embeds[0]?.fields[0].name.match(/I've bumped up/)){
      message.channel.send({
        embeds:[{
          color: "BLUE",
          title:"DISSOKU通知",
          description:"UPを受信しました\n1時間後に通知します"
        }]  
      });

      sleep(60000 * 60, function (){
        message.channel.send({
          embeds:[{
            color: "BLUE",
            title:"DISSOKU通知",
            description:"DISSOKUの時間です\n`/dissoku up`でサーバーの表示順位を上げよう！"
          }]  
        });
      });
    }
  }
}

module.exports = dissoku