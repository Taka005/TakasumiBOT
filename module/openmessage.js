async function openmessage(message,client){
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discord.com/channels/"+/\d{18}/+"/"+/\d{18}/+"/"+/\d{18}/)){
    const url = message.content.match(/\d{18}/g);
    const channel = await client.channels.cache.get(url[1]);
    const msg = await channel.messages.fetch(url[2]);

    if(!url.length==3) return;
    if(msg.attachments.first()){
      message.channel.send({
        embeds:[{
          color: "WHITLE",
          author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.content || "メッセージ内容がありません",
          footer: {
            text: msg.channel.name
          },
          timestamp: msg.createdAt
        }]
      });
    }
  }
}

module.exports = openmessage