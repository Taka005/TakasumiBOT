async function openmessage(message,client){
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discordapp.com/channels/")||message.content.match("https://discord.com/channels/")){
    const url = message.content.match(/\d{18}/g);
    const channel = await client.channels.cache.get(url[1]);
    if(!channel) return;
    if(!url.length==3) return;
    const msg = await channel.messages.fetch(url[2]);
    if(!msg.attachments.first()){
      message.channel.send({
        embeds:[{
          color: "RED",
          author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.content || "メッセージ内容がありません",
          footer: {
            text: `#${msg.channel.name}`
          },
          timestamp: msg.createdAt
        }]
      })
    }else{
      const attachment = msg.attachments.map(attachment => attachment.url)
      message.channel.send({
        embeds:[{
          color: "RED",
          author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.content || "メッセージ内容がありません",
          image: {
            url: attachment[0]
          },
          footer: {
            text: `#${msg.channel.name}`
          },
          timestamp: msg.createdAt
        }]
      })
    }
    return;
  }
}

module.exports = openmessage