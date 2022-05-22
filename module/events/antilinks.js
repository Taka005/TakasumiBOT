function antilink(message,client){
  const config = require("../../config.json")
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot || message.channel.id !==`${config.ad_channel}`) return;  
  if(message.content.match("discord.com/invite") ||message.content.match("discord.gg")){
    client.users.cache.get(message.author.id).send('あなたの送信した招待リンク、宣伝チャンネル等以外で送信していませんか？\n招待リンクを宣伝チャンネル以外で送信するのは控えましょう')
      .catch(()=>message.reply("宣伝チャンネル等以外で送信するのは控えてください"))
  }
}

module.exports = antilink