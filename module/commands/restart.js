async function restart(message){
  const ch = require("child_process")
  const config = require("../../config.json")
  if(message.content === `${config.prefix}restart`){
    if(message.author.id !== `${config.admin}`) return message.reply("このコマンドは製作者専用です")
    return message.reply("開発中....");
    ch.exec("npm install")
    ch.exec("npm start") 
  }
}

module.exports = restart