async function openmessage(message,client){
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discord.com/channels/")){
    const url = message.content.match(/\d{18}/g);
    const channel = await client.channels.cache.get(url[1]);
    const msg = await channel.messages.fetch(url[2]);
    if(!url.length==3) return;
    message.channel.send({
      embeds:[{
        color: "WHITLE",
        author: {
          name: `${msg.author.tag}`,
          icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
        },
        description: `${msg.content}`,
        footer: {
          text: `${msg.channel.parent.name}:${msg.channel.name}`
        },
        timestamp: msg.createdAt
      }]
    });
  }
}

module.exports = openmessage