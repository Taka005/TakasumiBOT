async function avatar(message,client){
  const config = require("../../config.json")
  if(message.content.startsWith(`${config.prefix}avatar`)) {
    if(message.content === `${config.prefix}avatar`){
      return message.reply(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png");
    }
    try{
      const args = message.content.split(" ").slice(1);
      let user = await client.users.fetch(args[0]);
      message.reply(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png")
        .catch(()=>{return message.reply("アイコンが取得出来ませんでした")});
    }catch{
      message.reply("ユーザーが取得できませんでした");
    }
    return;
  }
}

module.exports = avatar