const { PartialWebhookMixin } = require("discord.js");

async function restart(message,client,token){
  const config = require("../../config.json")
  require("dotenv").config();
  if(message.content === `${config.prefix}restart`){
    return;
    if(message.author.id !== `${config.admin}`) return message.reply("このコマンドは製作者専用です")
    message.channel.send("3秒後に再ログインします...")
      client.destroy(token)
      message.channel.send("ログイン試みます...")
      client.login(token)
        .then(()=>message.channel.send("ログインに成功しました!"))
        .catch(()=>message.channel.send("ログインに失敗しました.."))
  }
}

module.exports = restart