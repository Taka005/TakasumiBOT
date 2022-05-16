function antilink(message,client){
  const config = require("../config.json");

  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://") ||message.content.match("discord.gg") ||message.content.match("www.")){
      client.users.cache.get(message.author.id).send('あなたの送信したDiscordの招待リンク、宣伝チャンネル等以外で送信していませんか？')
        .catch(()=>message.reply("あなたの送信したDiscordの招待リンク、宣伝チャンネル等以外で送信していませんか？"))
    }
}

module.exports = antilink