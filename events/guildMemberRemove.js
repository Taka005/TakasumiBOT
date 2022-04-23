function guildMemberRemove(client) {
    const fs = require('fs');
    client.on('guildMemberRemove', member => {
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
        console.log(`[${h}:${m}:${s}]LEAVE:${member.user.tag} PING:${client.ws.ping}ms`)  
      
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]LEAVE:${member.user.tag} PING:${client.ws.ping}ms`, (err) => {
          if(err) {
            console.log(err);
          }
        }); 
        
        if (member.guild.id !== "942268307795492864") return; //サーバーを指定
          member.guild.channels.cache.get("942268307795492867").send(`${member.user}鷹のすみかから脱退しました`);
      });
}

module.exports = guildMemberRemove

/**
 * development by Taka005#1203
 *
 * please join the my discord server
 * https://discord.gg/GPs3npB63m
 */