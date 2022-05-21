async function openmessage(message,client){
  if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
  if(message.content.match("https://discordapp.com/channels/")||message.content.match("https://discord.com/channels/")||message.content.match("https://ptb.discord.com/channels/")||message.content.match("https://canary.discord.com/channels/")){
    const url = message.content.match(/\d{18}/g);
    const channel = await client.channels.cache.get(url[1]);
    if(!channel||!url[2]) return;
    const msg = await channel.messages.fetch(url[2]);

    if(!msg.attachments.first()){
      message.channel.send({//添付ファイルなし
        embeds:[{
          color: "WHITE",
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
          color: "WHITE",
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
          color: "WHITE",
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
              name: "添付ファイル",
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

module.exports = openmessage