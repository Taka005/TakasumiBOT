async function global(message,client){
  if(message.author.bot || !message.channel.topic === "==GLOBAL==") return;
  client.channels.cache.filter(channel => channel.topic == "global")
    .forEach((channel) =>{
      if(!msg.attachments.first()){
        message.channel.send({//添付ファイルなし
          embeds:[{
            color: "WHITE",
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
      }else if(msg.attachments.first().height && msg.attachments.first().width){
        const attachment = msg.attachments.map(attachment => attachment.url)
        message.channel.send({//添付ファイルあり(画像)
          embeds:[{
            color: "WHITE",
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
      }else{
        const attachment = msg.attachments.map(attachment => attachment.url)
        message.channel.send({//添付ファイルあり(画像以外)
          embeds:[{
            color: "WHITE",
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
      }
    });
}

module.exports = global