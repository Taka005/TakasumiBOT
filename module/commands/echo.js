async function echo(message,client){
  const reply = `<@!${message.author.id}>`
  const config = require("../../config.json")
  if(message.content.startsWith(`${config.prefix}say`)){
    const args = message.content.split(" ").slice(1);
      message.delete()    
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${reply}${config.prefix}echoを使う権限がありません`); 
    if(echo[1]){
      client.channels.cache.get(echo[1]).send(`${echo[0].replace("@","＠")}`)
        .catch(()=>{message.reply("チャンネルの指定が間違っています")});
      return;
    }
    message.channel.send(`${args.replace("@","＠") || "表示するテキストがありません"}`)
    return;
  }
};
  
module.exports = echo