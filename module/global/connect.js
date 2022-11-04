module.exports = async(msg,client)=>{
  const mute_server = require("../../data/block_server.json");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const { WebhookClient } = require("discord.js");
  const fs = require("fs");

  if(main[msg.channel.id]) return;
  Object.keys(main).forEach(async (channels)=>{

    const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
    if(mute_server[guild]) return;

    const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
    await webhooks.send({
      embeds:[{
        color: "RANDOM",
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}[UGC]`,
          url: `https://discord.com/users/${msg.author.id}`,
          icon_url: msg.author.avatarURL||"https://cdn.discordapp.com/embed/avatars/0.png",
        },
        description: msg.message.content,
        image: {
          url: (msg.message.attachments.length) ? msg.message.attachments[0].url : null
        },
        footer: {
          text: `${msg.guild.name}<${msg.guild.id}>`,
          icon_url: msg.guild.iconURL||"https://cdn.discordapp.com/embed/avatars/0.png"
        },
        timestamp: new Date()
      }]      
    }).catch((error)=>{
      delete main[channels];
      const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
      delete sub[guild];
      fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
      fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
      delete require.cache[require.resolve("../../data/global/sub.json")];
      delete require.cache[require.resolve("../../data/global/main.json")];

      client.channels.cache.get(channels).send({
        embeds:[{
          author: {
            name: "グローバルチャットでエラーが発生しました",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "エラーが発生したため、強制的に切断されました\n再度登録するには`/global`を使用してください",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }]
      })
      .catch(()=>{})
    })
  });
}