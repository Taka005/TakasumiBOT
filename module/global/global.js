async function global(message){
  const mute_user = require("../../data/block_user.json");
  const mute_server = require("../../data/block_server.json");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const { WebhookClient } = require('discord.js');
  const fs = require("fs");
  if(!message.channel.type === "GUILD_TEXT" || message.author.bot || !main[message.channel.id]) return;

  if(mute_server[message.guild.id]){
    return message.reply({
      embeds:[{
        color: "RED",
        description: `申し訳御座いませんが、このサーバーはブラックリストに\n登録されているため、送信できません[理由:${mute_server[message.guild.id]}]`,
      }]
    });
  }

  if(mute_user[message.author.id]){
    return message.reply({
      embeds:[{
        color: "RED",
        description: `申し訳御座いませんが、あなたはブラックリストに\n登録されているため、送信できません[理由:${mute_user[message.author.id]}]`,
      }]
    });
  }

  if(message.content.match("discord.com/invite") || message.content.match("discord.gg")){
    return message.reply({
      embeds:[{
        color: "RED",
        description: "申し訳御座いませんが、グローバルチャットで\n招待リンクを送信することは禁止されています",
      }]
    });
  }

  const content = message.content
    .replace(/@eveyone|@here/g,"[メンション](https://taka.ml/bot/takasumi.html)")
    .replace(/死ね|カス|クズ|ゴミ|黙れ|消えろ|うんち|ウンチ|死んどけ/g,"[NG](https://taka.ml/bot/takasumi.html)")

  if(!message.attachments.first()){
    Object.keys(main).forEach(async (channels)=>{//添付ファイルなし
      if(channels == message.channel.id) return;

      const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
      await webhooks.send({
        embeds:[{
          color: message.member.displayHexColor,
          author: {
            name: `${message.author.tag}(${message.author.id})`,
            icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: content,
          footer: {
            text:`${message.guild.name}<${message.guild.id}>`,
            icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
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
    message.react("✅")
      .catch(()=>{});
    return;
  }else if(message.attachments.first().height && message.attachments.first().width){
    const attachment = message.attachments.map(attachment => attachment.url);
    Object.keys(main).forEach(async (channels)=>{//添付ファイルあり(画像)
      if(channels == message.channel.id) return;
      const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});

      await webhooks.send({
        embeds:[{
          color: message.member.displayHexColor,
          author: {
            name: `${message.author.tag}(${message.author.id})`,
            icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: content,
          image: {
            url: attachment[0]
          },
          footer: {
            text: `${message.guild.name}<${message.guild.id}>`,
            icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
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
    message.react("✅")
      .catch(()=>{});
    return;
  }else{
    const attachment = message.attachments.map(attachment => attachment.url);
    Object.keys(main).forEach(async (channels)=>{//添付ファイルあり(画像以外)
      if(channels == message.channel.id) return;
      const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
      await webhooks.send({
        embeds:[{
          color: message.member.displayHexColor,
          author: {
            name: `${message.author.tag}(${message.author.id})`,
            icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
          },
          description: content,
          footer: {
            text:`${message.guild.name}<${message.guild.id}>` ,
            icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          fields: [
            {
              name: "**添付ファイル**",
              value: `${attachment[0]}`
            }
          ],
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
    message.react("✅")
      .catch(()=>{});
    return;
  }
}

module.exports = global