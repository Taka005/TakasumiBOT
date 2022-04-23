function ready(client) {
    const fs = require('fs');

    client.once("ready", async () => {
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
            client.user.setActivity(`ver:2.3.1`, {
              type: 'PLAYING'
            });
            stats = 0; 
          }
        }, 8000)
      //console.log
        console.log(`[${h}:${m}:${s}]CLIENT:READY! USER:${client.user.tag}`); 
        console.log(`[${h}:${m}:${s}]CLIENT:<${client.guilds.cache.size}>SERVER`)
      //fs.log
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]CLIENT:READY! USER:${client.user.tag}`, (err) => {
          if(err) {
            console.log(err);
          }
        }); 

        //スラッシュコマンドコマンド
        const help = [{
          name: "help",
          description: "使い方がわかります",
        }];
        await client.application.commands.set(help,'942268307795492864');
      });
}

module.exports = ready

/**
 * development by Taka005#1203
 *
 * please join the my discord server
 * https://discord.gg/GPs3npB63m
 */