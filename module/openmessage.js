async function openmessage(message,client){
  const config = require("../../config.json");
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discord.com/channels/"+/[0-9]{18}/+"/"+/[0-9]{18}/+"/"+/[0-9]{18}/)){
    const url = message.content.match(/[0-9]{18}/g);
    const channel = client.channels.cache.get(url[1]);
    const message = channel.messages.fetch(url[2]);
  }
}

module.exports = openmessage