async function ready(client){
  const config = require("../../config.json")
  const fs = require("fs");
    //時間
    let now = new Date();
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds() 
      
    let stats = 0; 
    setInterval(() => {
      if(stats == 0){
        client.user.setActivity(`Created by Taka005#1203`, {
          type: 'PLAYING'
        });      
        stats = 1;
      }else if(stats == 1){
        client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
          type: 'PLAYING'
        });
        stats = 2;
      }else if(stats == 2){
        client.user.setActivity(`ver:${config.version}`, {
          type: 'PLAYING'
        });
        stats = 3; 
      }else if(stats == 3){
        client.user.setActivity(`${client.guilds.cache.size}サーバーを`,{
          type: 'PLAYING'
        });
      }
      stats = 0;
    }, 8000)

    client.channels.cache.get("947484748773736538").send(`BOT、API、WEBサーバーが再起動されました`);

    //console.log
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`); 
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:<${client.guilds.cache.size}>SERVER`)
    //fs.log
    fs.appendFileSync('../log.txt', `\n[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`, (err) => {
      if(err){
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