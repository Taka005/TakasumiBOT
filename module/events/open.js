async function open(message,client){
  if(message.author.bot) return;  
  if(message.content.match(/https:\/\/discordapp.com\/channels\/\d{18}\/\d{18}\//g)||message.content.match(/https:\/\/discord.com\/channels\/\d{18}\/\d{18}\//g)||message.content.match(/https:\/\/ptb.discord.com\/channels\/\d{18}\/\d{18}\//g)||message.content.match(/https:\/\/canary.discord.com\/channels\/\d{18}\/\d{18}\//g)){
    const url = message.content.split("/");

    const channel = client.channels.cache.get(url[5]);
    if(!channel) return;
    const msg = await channel.messages.fetch(url[6]);

    if(!msg.attachments?.first()){
      message.channel.send({//添付ファイルなし
        embeds:[{
          color: msg.member?.displayHexColor||"WHITE",
          author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.content || "メッセージ内容がありません",
          footer: {
            text: `#${msg.channel.name}`
          },
          timestamp: msg.createdAt
        }]
      });
    }else if(msg.attachments?.first().height && msg.attachments?.first().width){
      const attachment = msg.attachments.map(attachment => attachment.url)
      message.channel.send({//添付ファイルあり(画像)
        embeds:[{
          color: msg.member?.displayHexColor||"WHITE",
          author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.content || "メッセージ内容がありません",
          image: {
            url: attachment[0]
          },
          footer: {
            text: `#${msg.channel.name}`
          },
          timestamp: msg.createdAt
        }]
      });
    }else{
      const attachment = msg.attachments.map(attachment => attachment?.url)
      message.channel.send({//添付ファイルあり(画像以外)
        embeds:[{
          color: msg.member?.displayHexColor||"WHITE",
          author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.content || "メッセージ内容がありません",
          footer: {
            text: `#${msg.channel.name}`
          },
          fields: [
            {
              name: "**添付ファイル**",
              value: `${attachment[0]||"エラー"}`
            }
          ],
          timestamp: msg.createdAt
        }]
      });
    }
    return;
  }
}

module.exports = open