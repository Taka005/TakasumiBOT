module.exports = async(member)=>{
  const mysql = require("../lib/mysql");
  const limit = require("../lib/limit");

  const data = await mysql(`SELECT * FROM \`leave\` WHERE server = ${member.guild.id} LIMIT 1;`);
  if(data[0]){
    if(limit(member.guild.id)) return;
    
    const msg = data[0].message
    .replace("[User]",`<@${member.user.id}>`)
    .replace("[UserName]",`${member.user.tag}`)
    .replace("[UserID]",`${member.user.id}`)
    .replace("[ServerName]",`${member.guild.name}`)
    .replace("[ServerID]",`${member.guild.id}`)
    .replace("[Count]",`${member.guild.memberCount}`)

  member.guild.channels.cache.get(`${data[0].channel}`).send(`${msg}`)
    .catch(()=>{});
  }
}