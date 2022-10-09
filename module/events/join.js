async function join(member){
  const { serverid,enter_channel,member_channel,member_mention,hello_message } = require("../../config.json");

  if(member.guild.id !== `${serverid}`) return;

  member.guild.channels.cache.get(`${enter_channel}`).send(`${member.user}${hello_message}`)
    
  member.guild.channels.cache.get(`${member_channel}`).send(`<@&${member_mention}>`+`${member.user.tag}がサーバーに参加しました。\n現在、${member.guild.memberCount}人がサーバーに参加中...`);
}

module.exports = join