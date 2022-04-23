function guildMemerAdd(client) {
    const fs = require('fs');

    client.on("guildMemberAdd", member => {
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
      
        console.log(`[${h}:${m}:${s}]JOIN:${member.user.tag} PING:${client.ws.ping}ms`)
      
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]JOIN:${member.user.tag} PING:${client.ws.ping}ms`, (err) => {
          if(err) {
            console.log(err);
          }
        });
        
        if (member.guild.id !== "942268307795492864") return; //サーバーを指定
          member.guild.channels.cache.get("942268307795492867").send(`${member.user}鷹のすみかへようこそ！この鯖では認証を行う必要があります。<#942272675584307260>でロールを付与してください`);
          
          member.guild.channels.cache.get("942271322690555904").send(`<@&944548589777080330>`+`${member.user.tag}がサーバーに参加しました。\n現在、${member.guild.memberCount}人がサーバーに参加中...`);
      });
}

module.exports = guildMemerAdd 

/**
 * development by Taka005#1203
 *
 * please join the my discord server
 * https://discord.gg/GPs3npB63m
 */