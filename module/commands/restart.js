async function restart(message,client){
  const config = require("../../config.json")
  require("dotenv").config();
  if(message.content === `${config.prefix}restart`){
    if(message.author.id !== `${config.admin}`) return message.reply("このコマンドは製作者専用です")
    const msg = message.channel.send("3秒後に再ログインします...")
    setTimeout(() => {
      msg.edit("ログアウト中...")
      client.destroy()
        .then(()=>msg.edit("ログアウトしました!"))
        .catch(()=>msg.edit("ログアウトに失敗しました.."))
    },3000);
    const msg1 = message.channel.send("ログイン試みます...")
    client.login(process.env.DISCORD_BOT_TOKEN)
      .then(()=>msg1.edit("ログインに成功しました!"))
      .catch(()=>msg1.edit("ログインに失敗しました.."))
  }
}

module.exports = restart