async function avatar(message,client){
    const config = require("../../config.json")
    const reply = `<@!${message.author.id}>`
    if (message.content.startsWith(`${config.prefix}avatar`)) {
        if(message.content === `${config.prefix}avatar`){
            message.channel.send(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png");
            return;
        }
        try{
          const args = message.content.split(" ").slice(1);
          let user = await client.users.fetch(args[0])
          message.channel.send(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png")
            .catch(()=>{return message.channel.send(`${reply}アイコンが取得出来ませんでした`)})
        }catch(err){
          message.channel.send(`${reply}ユーザーが取得できませんでした。`)
        }
        return;
    }
}

module.exports = avatar