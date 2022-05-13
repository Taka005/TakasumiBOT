async function status(message,client){
    const os 	= require('os');
    const config = require("../../config.json");
    if(message.content === `${config.prefix}status`){
      //CPU
      
      //memory
      let ramfree = Math.round(os.freemem / 1000000);
      let ramtotal = Math.round(os.totalmem / 1000000);
      let ramuse = ramtotal - ramfree
      let rampercent = Math.round(ramuse / ramtotal * 100)

      //起動時間
      let timeup = os.uptime()
      let timeuphours = Math.round(timeup / 60);
      message.channel.send({
        embeds:[{
          title: "ステータス",
          color: "BLUE",
          timestamp: new Date(),
          fields: [
          {
          name: "**DiscordBOT**",
          value: `${client.ws.ping}ミリ秒`
          },
          {
            name: "**システム情報**",
            value: `取得できませんでした`
          },
          {
          name: "**システム使用率**",
          value: `**CPU**\n取得出来ませんでした\n**メモリー**\n${ramuse} MB / ${ramtotal} MB ${rampercent}％\n`
          },
          {
          name: "**起動時間**",
          value: `${timeuphours}分`
          }
        ]
        }]}
      )
      return;
  }
}

module.exports = status