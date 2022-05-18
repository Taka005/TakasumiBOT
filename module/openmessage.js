async function openmessage(message,client){
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discord.com/channels/"+/[0-9]{18}/+"/"+/[0-9]{18}/+"/"+/[0-9]{18}/)){
    const url = message.content.match(/[0-9]{18}/g);
    const channel = client.channels.cache.get(url[1]);
    const message = channel.messages.fetch(url[2]);
    if(!url[0]&& !url[1]&& !url[2]) return;
    message.channel.send({
      embeds:[{
        color: "WHITLE",
        author: {
          name: `${message.author.tag}`,
          icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
        },
        description: `${message.content}`,
        footer: {
          text: `${message.channel.parent.name}:${message.channel.name}`
        },
        timestamp: message.createdAt
      }]
    });
  }
}

module.exports = openmessage