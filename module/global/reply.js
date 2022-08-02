async function global(message,client){
  const mute_user = require("../../data/block_user.json");
  const mute_server = require("../../data/block_server.json");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const { WebhookClient } = require("discord.js");
  const fs = require("fs");
  if(!message.channel.type === "GUILD_TEXT"||message.author.bot||!main[message.channel.id]||!message.reference?.messageId) return;

  if(mute_server[message.guild.id]||mute_user[message.author.id]||message.content.length > 300){
    return message.react("❌")
      .catch(()=>{}) 
  }

  const content = message.content
    .replace(/@everyone|@here/g,"[メンション]")
    .replace(/死ね|カス|クズ|ゴミ|ごみ|黙れ|消えろ|うんち|ウンコ|ウンチ|死んどけ/g,"[NG]")
    .replace(/(?:https?:\/\/)?(?:discord\.(?:gg|io|me|li)|(?:discord|discordapp)\.com\/invite)\/(\w+)/g,"[[招待リンク]](https://taka.ml/support)")
    
  const user = await message.author.fetch();

  try{
    const reply_webhooks = new WebhookClient({id: main[message.channel.id][0], token: main[message.channel.id][1]});
    const msg = await reply_webhooks.fetchMessage(message.reference.messageId);
    const author = msg.embeds[0].author.name.split("#");

    if(!message.attachments.first()){
      Object.keys(main).forEach(async (channels)=>{//添付ファイルなし

        const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
        if(channels == message.channel.id||mute_server[guild]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[{
            color: user.hexAccentColor,
            author: {
              name: `${message.author.tag}(${message.author.id})`,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: `${content}`,
            fields: [
              {
                name: "\u200b",
                value: `**${author[0]}>>** ${msg.embeds[0].description || "なし"}`
              }
            ],
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
      })
      message.react("✅")
        .catch(()=>{});
      return;
    }else if(message.attachments.first().height && message.attachments.first().width){//添付ファイルあり(画像)
      const attachment = message.attachments.map(attachment => attachment);
      Object.keys(main).forEach(async (channels)=>{

        const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
        if(channels == message.channel.id||mute_server[guild]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: user.hexAccentColor,
              author: {
                name: `${message.author.tag}(${message.author.id})`,
                icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
              },
              description: `${content}`,
              fields: [
                {
                  name: "\u200b",
                  value: `**${author[0]}>>** ${msg.embeds[0].description || "なし"}`
                }
              ],
              footer: {
                text: `${message.guild.name}<${message.guild.id}>`,
                icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
              },
              timestamp: new Date()
            },
            {
              title: attachment[0].name,
              image: {
                url: attachment[0].url
              }
            }
          ]
        }).catch(()=>{
          delete main[channels];
          const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
          delete sub[guild];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
          delete require.cache[require.resolve("../../data/global/sub.json")];
          delete require.cache[require.resolve("../../data/global/main.json")];
        })
      })
      message.react("✅")
        .catch(()=>{});
      return;
    }else{//添付ファイルあり(画像以外)
      const attachment = message.attachments.map(attachment => attachment);

      Object.keys(main).forEach(async (channels)=>{

        const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
        if(channels == message.channel.id||mute_server[guild]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[{
            color: user.hexAccentColor,
            author: {
              name: `${message.author.tag}(${message.author.id})`,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: `${content}`,
            footer: {
              text:`${message.guild.name}<${message.guild.id}>` ,
              icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "添付ファイル",
                value: `[${attachment[0].name}](${attachment[0].url})`
              },
              {
                name: "\u200b",
                value: `**${author[0]}>>** ${msg.embeds[0].description || "なし"}`
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
      })
      message.react("✅")
        .catch(()=>{});
      return;
    }
  }catch{//同じサーバーでの返信
    const msg = await message.channel.messages.fetch(message.reference.messageId)
      .catch(()=>{});

    if(!message.attachments.first()){
      Object.keys(main).forEach(async (channels)=>{//添付ファイルなし

        const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
        if(channels == message.channel.id||mute_server[guild]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[{
            color: user.hexAccentColor,
            author: {
              name: `${message.author.tag}(${message.author.id})`,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: `${content}`,
            fields: [
              {
                name: "\u200b",
                value: `**${msg.author.username}>>** ${msg.content || "なし"}`
              }
            ],
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
      })
      message.react("✅")
        .catch(()=>{});
      return;
    }else if(message.attachments.first().height && message.attachments.first().width){//添付ファイルあり(画像)
      const attachment = message.attachments.map(attachment => attachment);
      Object.keys(main).forEach(async (channels)=>{

        const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
        if(channels == message.channel.id||mute_server[guild]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: user.hexAccentColor,
              author: {
                name: `${message.author.tag}(${message.author.id})`,
                icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
              },
              description: `${content}`,
              fields: [
                {
                  name: "\u200b",
                  value: `**${msg.author.username}>>** ${msg.content || "なし"}`
                }
              ],
              footer: {
                text: `${message.guild.name}<${message.guild.id}>`,
                icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
              },
              timestamp: new Date()
            },
            {
              title: attachment[0].name,
              image: {
                url: attachment[0].url
              }
            }
          ]
        }).catch(()=>{
          delete main[channels];
          const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
          delete sub[guild];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
          delete require.cache[require.resolve("../../data/global/sub.json")];
          delete require.cache[require.resolve("../../data/global/main.json")];
        })
      })
      message.react("✅")
        .catch(()=>{});
      return;
    }else{//添付ファイルあり(画像以外)
      const attachment = message.attachments.map(attachment => attachment);

      Object.keys(main).forEach(async (channels)=>{

        const guild = Object.keys(sub).filter((key)=> sub[key] == channels);
        if(channels == message.channel.id||mute_server[guild]) return;
        
        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[{
            color: user.hexAccentColor,
            author: {
              name: `${message.author.tag}(${message.author.id})`,
              icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
            },
            description: `${content}`,
            footer: {
              text:`${message.guild.name}<${message.guild.id}>` ,
              icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "添付ファイル",
                value: `[${attachment[0].name}](${attachment[0].url})`
              },
              {
                name: "\u200b",
                value: `**${msg.author.username}>>** ${msg.content || "なし"}`
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
      })
      message.react("✅")
        .catch(()=>{});
      return;
    }
  }
}

module.exports = global