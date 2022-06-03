async function status(message,client){
    const os 	= require('os');
    const config = require("../../config.json");
    if(message.content === `${config.prefix}status`){

      //memory
      let ramfree = Math.round(os.freemem / 1000000);
      let ramtotal = Math.round(os.totalmem / 1000000);
      let ramuse = ramtotal - ramfree
      let rampercent = Math.round(ramuse / ramtotal * 100)

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
            value: `Celeron G540\nubuntu server`
          },
          {
          name: "**システム使用率**",
          value: `**CPU**\n取得出来ませんでした\n**メモリー**\n${ramuse} MB / ${ramtotal} MB ${rampercent}％\n`
          },
          {
          name: "**起動時間**",
          value: `PROCESS:${Math.round(process.uptime() / 60)}分\nSERVER:${Math.round(os.uptime() / 60)}分`
          }
        ]
        }]}
      )
      return;
  }
}

module.exports = status