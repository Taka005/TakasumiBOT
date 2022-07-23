async function open(message,client){
  if(message.author.bot) return;  
  if(message.content.match(/https:\/\/discordapp.com\/channels\/\d{18}\/\d{18}\//g)||message.content.match(/https:\/\/discord.com\/channels\/\d{18}\/\d{18}\//g)||message.content.match(/https:\/\/ptb.discord.com\/channels\/\d{18}\/\d{18}\//g)||message.content.match(/https:\/\/canary.discord.com\/channels\/\d{18}\/\d{18}\//g)){
    const url = message.content.match(/\d{18}/g);

    try{
      const channel = await client.channels.cache.get(url[1]);
      const msg = await channel.messages.fetch(url[2]);
    }catch{
      const channel = await client.channels.cache.get(url[1]);
      const id = message.content.match(/\d{19}/);
      const msg = await channel.messages.fetch(id);
    }

    if(!msg.attachments.first()){
      message.channel.send({//添付ファイルなし
        embeds:[{
          color: msg.member.displayHexColor,
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
    }else if(msg.attachments.first().height && msg.attachments.first().width){
      const attachment = msg.attachments.map(attachment => attachment.url)
      message.channel.send({//添付ファイルあり(画像)
        embeds:[{
          color: msg.member.displayHexColor,
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
      const attachment = msg.attachments.map(attachment => attachment.url)
      message.channel.send({//添付ファイルあり(画像以外)
        embeds:[{
          color: msg.member.displayHexColor,
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
              value: `${attachment[0]}`
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