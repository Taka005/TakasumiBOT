function join(member){
  const config = require("../config.json");

  if(member.guild.id !== `${config.serverid}`) return;
  member.guild.channels.cache.get(`${config.enter_channel}`).send(`${member.user}${config.hello_message}`);
    
  member.guild.channels.cache.get(`${config.member_channel}`).send(`<@&${config.member_mention}>`+`${member.user.tag}がサーバーに参加しました。\n現在、${member.guild.memberCount}人がサーバーに参加中...`);
}

module.exports = join