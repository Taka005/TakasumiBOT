async function global(message,client){
  if(message.author.bot || message.channel.topic !== "==GLOBAL==") return;
    if(!message.attachments.first()){
      client.channels.cache.filter(channel => channel.topic == "==GLOBAL==").forEach((channel) =>{
        channel.send({//添付ファイルなし
          embeds:[{
            color: message.member.displayHexColor,
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: message.content,
            footer: {
              text: message.guild.name,
              icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
            },
            timestamp: new Date()
          }]}
        );
      });
      message.delete()
      return;
    }else if(message.attachments.first().height && message.attachments.first().width){
      client.channels.cache.filter(channel => channel.topic == "==GLOBAL==").forEach((channel) =>{
        const attachment = message.attachments.map(attachment => attachment.url)
        channel.send({//添付ファイルあり(画像)
          embeds:[{
            color: message.member.displayHexColor,
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: message.content,
            image: {
              url: attachment[0]
            },
            footer: {
              text: message.guild.name,
              icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
            },
            timestamp: new Date()
          }]}
        );
      });
      message.delete()
      return;
    }else{
      client.channels.cache.filter(channel => channel.topic == "==GLOBAL==").forEach((channel) =>{
        const attachment = message.attachments.map(attachment => attachment.url)
        channel.send({//添付ファイルあり(画像以外)
          embeds:[{
            color: message.member.displayHexColor,
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: message.content,
            footer: {
              text: message.guild.name,
              icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "**添付ファイル**",
                value: `${attachment[0]}`
              }
            ],
            timestamp: new Date()
          }]}
        );
      });
      message.delete()
      return;
    }
}

module.exports = global