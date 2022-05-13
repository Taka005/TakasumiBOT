async function join(message){
  const config = require("../../config.json")
  if(message.content === `${config.prefix}join`){
    const period = Math.round((Date.now() - message.member.joinedAt) / 86400000) 
    message.reply(message.author.tag+`は${message.guild.name}に約${period}日間サーバーに参加しています`)
    return;
  }
}

module.exports = join