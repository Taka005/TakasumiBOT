function get(message,client){
  if(message.channel.id != "949862388969119755" || message.author.id == client.user.id || !message.embeds[0].description) return;
  let msg = JSON.parse(new Buffer.from(message.embeds[0].description, "base64"));
  message.react("🔁")

  client.channels.cache.get("949900405012324372").send({//解読コード
    embeds: [{
      description: JSON.stringify(msg,null,"　")
    }]
  });
  let count = 0;
  if(!msg.message.attachments.length){
    client.channels.cache.filter(channel => channel.topic == "==GLOBAL==").forEach((channel) =>{
      channel.send({//添付ファイルなし
        embeds:[{
          color: "WHITE",
          author: {
            name: `${msg.author.username}${msg.author.discriminator}`,
            icon_url: msg.author.avatarURL ||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: msg.message.content,
          footer: {
            text: `${msg.guild.name} <${message.author.username}>`,
            icon_url:msg.guild.iconURL ||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date()
        }]
      });

      count++;
      if(count == 40){
        setTimeout(() => {
          count = 0;
        }, 1000);
      }
    });
    message.react("✅")
    return;
  }else{
    client.channels.cache.filter(channel => channel.topic == "==GLOBAL==").forEach((channel) =>{
      channel.send({//添付ファイルあり
        embeds:[{
          color: "WHITE",
          author: {
            name: `${msg.author.username}${msg.author.discriminator}`,
            icon_url: msg.author.avatarURL ||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description:`${msg.message.content}\n[添付ファイル](${msg.message.attachments[0].url})`,
          footer: {
            text: `${msg.guild.name} <${message.author.username}>`,
            icon_url:msg.guild.iconURL ||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date()
        }]
      });

      count++;
      if(count == 40){
        setTimeout(() => {
          count = 0;
        }, 1000);
      }
    });
    message.react("✅")
    return;
  }
}

module.exports = get