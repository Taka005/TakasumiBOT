function leave(member){
  const config = require("../config.json");

  if(member.guild.id !== `${config.serverid}`) return; 
  member.guild.channels.cache.get(`${config.enter_channel}`).send(`${member.user}${config.servername}から脱退しました`);
}

module.exports = leave