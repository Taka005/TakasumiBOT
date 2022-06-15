function dm(message,client){
  const config = require("../../config.json");
  const reply = `<@!${message.author.id}>`
  if(message.content.startsWith(`${config.prefix}dm`)){
    if(message.author.id !==`${config.admin}`) return message.reply("このコマンドは製作者専用です")
    const args = message.content.split(" ").slice(1);
    if(!args[0]&&!args[1]) return message.reply(`${config.prefix}dm [userID] [TEXT]と指定してください`);  
    if(!args[0].match(/\d{18}/)) return message.reply("ユーザーIDは数字です")
    client.users.cache.get(`${args[0]}`).send(`${args[1]}`)
      .then(()=>message.reply(`${args[0]}にDMを送信しました`))
      .catch(()=>message.reply("ユーザーのDMが有効になっていませんでした..."))
    return;
  }
}

module.exports = dm