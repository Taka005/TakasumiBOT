async function ready(client){
  const config = require("../../config.json");
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
        client.user.setActivity(`taka.ml || ver:${config.version}`, {
          type: 'PLAYING'
        });
        stats = 3; 
      }else if(stats == 3){
        client.user.setActivity(`${client.guilds.cache.size}server || ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}user`,{
          type: 'PLAYING'
        });
        stats = 0;
      }
    }, 8000)

    client.channels.cache.get("947484748773736538").send(`BOT、API、WEBサーバーが再起動されました`);

    //console.log
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`); 
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:<${client.guilds.cache.size}>SERVER`)

    //スラッシュコマンドコマンド
    const commands = [
      {
        name: "help",
        description: "使い方がわかります",
      },
      {
        name: "support",
        description: "バグの報告、質問などの報告をします",
      },
      {
        name:"embed",
        description:"埋め込みメッセージを簡単に作成できます"
      }
    ];
    await client.application.commands.set(commands);
}

module.exports = ready