function antilink(message,client){
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("discord.com/invite") ||message.content.match("discord.gg")){
      client.users.cache.get(message.author.id).send('あなたの送信した招待リンク、宣伝チャンネル等以外で送信していませんか？')
        .catch(()=>message.reply("あなたの送信した招待リンク、宣伝チャンネル等以外で送信していませんか？"))
  }
}

module.exports = antilink