async function openmessage(message,client){
  const config = require("../../config.json");
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discord.com/channels/"+/[0-9]{18}/+"/"+/[0-9]{18}/+"/"+/[0-9]{18}/)){

  }
}

module.exports = openmessage