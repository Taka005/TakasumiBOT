async function echo(message,client){
  const reply = `<@!${message.author.id}>`
  const confug = require("../../config.json");
  if(message.content.startsWith(`${config.prefix}echo`)){
    const args = message.content.split(" ").slice(1);
      message.delete()     
    if(!args[0]) return message.channel.send(`${reply}表示するテキストがありません`);  
      if(args[1]){
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`${reply}チャンネルを指定して${config.prefix}echoを使うには「メッセージ管理」の権限が必要です`);
        if(isNaN(args)) return message.channel.send(`${reply}第2引数にはチャンネルIDを指定してください`)
        client.channels.cache.get(args[1]).send(`${args[0].replace("@","＠")}`)
          .catch(()=>{message.reply("チャンネルの指定が間違っています")});
        return;
      }
      message.channel.send(`${args.replace("@","＠")}`)
    return;
  }
};
  
module.exports = echo