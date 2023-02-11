const time = {};
module.exports = (message)=>{
  if(!time[message.guild.id]){
    time[message.guild.id] = {
        time: 0,
        last: 0
    };
  }

  if(new Date() - time[message.guild.id].last <= 180000) return true;

  if(new Date() - time[message.guild.id].time <= 500){
    message.channel.send({
      embeds:[{
        author: {
          name: "レートリミット",
          icon_url: "https://cdn.taka.ml/images/system/warn.png"
        },
        description: "メッセージを送信する速度が早すぎます\n3分間はメッセージを応答しなくなります",
        timestamp: new Date(),
        color: "YELLOW"
      }]
    }).catch(()=>{})
    time[message.guild.id] = {
        time: new Date(),
        last: new Date()
    };
    return true;
  }else{
    time[message.guild.id].time = new Date();
    return false;
  }
}