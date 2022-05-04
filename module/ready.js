async function ready(client){
  const config = require("../config.json")
  const fs = require("fs");
      //時間
      var now = new Date();
      var h = now.getHours()
      var m = now.getMinutes()
      var s = now.getSeconds() 
      
      var stats = 0; 
      setInterval(() => {
        if (stats == 0){
          client.user.setActivity('Created by Taka005#1203', {
            type: 'PLAYING'
          });      
          stats = 1;
        } else if (stats == 1){
          client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
            type: 'PLAYING'
          });
          stats = 2;
        } else if (stats == 2){
          client.user.setActivity(`ver:${config.version}`, {
            type: 'PLAYING'
          });
          stats = 0; 
        }
      }, 8000)
    //console.log
      console.info(`\x1b[34m[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`); 
      console.info(`\x1b[34m[${h}:${m}:${s}]INFO:<${client.guilds.cache.size}>SERVER`)
    //fs.log
      fs.appendFileSync('../log.txt', `\n[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`, (err) => {
        if(err) {
          console.log(err);
        }
      }); 

    //スラッシュコマンドコマンド
    const commands = [
      {
        name: "help",
        description: "使い方がわかります",
      }
  ];
  await client.application.commands.set(commands);
}

module.exports = ready