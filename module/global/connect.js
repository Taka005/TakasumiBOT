async function connect(msg){
  const mute_server = require("../../data/block_server.json");
  const main = require("../../data/global/main.json");
  const { WebhookClient } = require("discord.js");

  Object.keys(main).forEach(async (channels)=>{//添付ファイルなし

    const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
    if(mute_server[guild]) return;

    const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
    await webhooks.send({
      embeds:[{
        color: "WHITE",
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}<${msg.author.id}>`,
          url: `https://discord.com/users/${msg.author.id}`,
          icon_url: msg.author.avatarURL||"https://cdn.discordapp.com/embed/avatars/0.png",
        },
        description: msg.message.content,
        footer: {
          text: `${msg.guild.name}<${msg.guild.id}>`,
          icon_url: msg.guild.iconURL ||"https://cdn.discordapp.com/embed/avatars/0.png"
        },
        timestamp: new Date()
      }]      
    }).catch(()=>{
      delete main[channels];
      const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
      delete sub[guild];
      fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
      fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
      delete require.cache[require.resolve("../../data/global/sub.json")];
      delete require.cache[require.resolve("../../data/global/main.json")];
    })
  });
}

module.exports = connect