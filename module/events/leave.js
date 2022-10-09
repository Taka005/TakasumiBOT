function leave(member){
  const { serverid,enter_channel } = require("../../config.json");

  if(member.guild.id !== `${serverid}`) return; 
  member.guild.channels.cache.get(`${enter_channel}`).send(`${member.user}${member.guild.name}から脱退しました`);
}

module.exports = leave