function support(message,client){
  const config = require("../../config.json");
  const reply = `<@!${message.author.id}>`
  if(message.content.startsWith(`${config.prefix}support`)){
    const text = message.content.slice(9);
    message.delete();
    if(message.content === `${config.prefix}support`) return message.channel.send(`${reply}報告内容を記入してください`);
    client.users.cache.get(message.author.id).send(`${text}についてサポートサーバーに報告しました。\n後日DMにて回答をお送りいたします\nご報告ありがとうございました\nサポートサーバー:https://discord.gg/GPs3npB63m`)
      .them(()=>message.channel.send(`${reply}サポートサーバーに報告しました`))
      .catch(()=>message.channel.send(`${reply}\n${text}について報告しました。\n後日DMにて回答をお送りいたしますので、DMでメッセージを送信可能にしてください\nご報告ありがとうございました\nサポートサーバー:https://discord.gg/GPs3npB63m`))
    //サポートサーバーへ送信
    if(!message.attachments.first()){
      client.channels.cache.get("947484748773736538").send({//添付ファイルなし
        embeds:[{
          color: "WHITE",
          author: {
            name: `${message.author.tag}:${message.author.id}`,
            icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: text || "メッセージ内容がありません",
          footer: {
            icon_url: message.guild.iconURL(),
            text: message.guild.name
          },
          timestamp: new Date()
        }]
      });
    }else if(message.attachments.first().height && message.attachments.first().width){
      const attachment = message.attachments.map(attachment => attachment.url)
      client.channels.cache.get("947484748773736538").send({//添付ファイルあり(画像)
        embeds:[{
          color: "WHITE",
          author: {
            name: `${message.author.tag}:${message.author.id}`,
            icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: text || "メッセージ内容がありません",
          image: {
            url: attachment[0]
          },
          footer: {
            icon_url: message.guild.iconURL(),
            text: message.guild.name
          },
          timestamp: new Date()
        }]
      });
    }else{
      const attachment = message.attachments.map(attachment => attachment.url)
      client.channels.cache.get("947484748773736538").send({//添付ファイルあり(画像以外)
        embeds:[{
          color: "WHITE",
          author: {
            name: `${message.author.tag}:${message.author.id}`,
            icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: text || "メッセージ内容がありません",
          footer: {
            icon_url: message.guild.iconURL(),
            text: message.guild.name
          },
          fields: [
            {
              name: "**添付ファイル**",
              value: `${attachment[0]}`
            }
          ],
          timestamp: new Date()
        }]
      });
    }
    return;
  }
  
  if(message.content.startsWith(`${config.prefix}back`)){
    if(message.author.id !==`${config.admin}`) return message.reply("このコマンドは製作者専用です")
    const args = message.content.split(" ").slice(1);
    if(!args[0]&&!args[1]) return message.reply(`${config.prefix}back [userID] [TEXT]と指定してください`);  
    if(!args[0].match(/\d{18}/)) return message.reply("ユーザーIDは数字です")
    client.users.cache.get(args[0]).send(`先日の報告、誠にありがとうございます。\n\n${args[1]}\n\nサポートサーバー:https://discord.gg/GPs3npB63m`)
      .then(()=>message.reply(`${args[0]}に回答を送信しました`))
      .catch(()=>message.reply("ユーザーのDMが有効になっていませんでした..."))
    return;
  }
}

module.exports = support