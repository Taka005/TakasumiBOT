module.exports = async(msg,client)=>{
  const mysql = require("../lib/mysql");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const convert = require("../lib/convert");
  const { WebhookClient } = require("discord.js");
  const async = require("async");

  if(main[msg.channel.id]) return;
  const message = await convert(msg);

  if(!message.reply.isReply){
    if(!message.attachments.isAttachments){
      async.each(Object.keys(main),async(channels)=>{//添付ファイルなし
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;
  
        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: "RANDOM",
              author: {
                name: `${message.author.tag}[UGC]`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL,
              },
              description: message.content,
              footer: {
                text:`${message.guild.name}<${message.guild.id}>`,
                icon_url: message.guild.iconURL
              },
              image: {
                url: `https://${message.id}.ugc`
              },
              timestamp: new Date()
            }
          ]      
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
    }else if(!message.attachments.attachment[0].isFile){//添付ファイルあり(画像)
      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;
  
        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: "RANDOM",
              author: {
                name: `${message.author.tag}[UGC]`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL,
              },
              description: message.content,
              footer: {
                text: `${message.guild.name}<${message.guild.id}>`,
                icon_url: message.guild.iconURL
              },
              image: {
                url: `https://${message.id}.ugc`
              },
              timestamp: new Date()
            },
            {
              title: message.attachments.attachment[0].name,
              image: {
                url: message.attachments.attachment[0].url
              }
            }
          ]
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
    }else{//添付ファイルあり(画像以外)
      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;
  
        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: "RANDOM",
              author: {
                name: `${message.author.tag}[UGC]`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL,
              },
              description: message.content,
              footer: {
                text:`${message.guild.name}<${message.guild.id}>` ,
                icon_url: message.guild.iconURL
              },
              fields: [
                {
                  name: "添付ファイル",
                  value: `[${message.attachments.attachment[0].name}](${message.attachments.attachment[0].url})`
                }
              ],
              image: {
                url: `https://${message.id}.ugc`
              },
              timestamp: new Date()
            }
          ]
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
    }
  }else{
    if(!message.attachments.isAttachments){
      async.each(Object.keys(main),async(channels)=>{//添付ファイルなし
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: "RANDOM",
              author: {
                name: `${message.author.tag}[UGC]`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL,
              },
              description: message.content,
              fields: [
                {
                  name: "\u200b",
                  value: `**${message.reply.user.tag}>>** ${message.reply.content || "なし"}`
                }
              ],
              footer: {
                text:`${message.guild.name}<${message.guild.id}>`,
                icon_url: message.guild.iconURL
              },
              image: {
                url: `https://${message.id}.ugc`
              },
              timestamp: new Date()
            }
          ]      
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
    }else if(!message.attachments[0].isFile){//添付ファイルあり(画像)
      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: "RANDOM",
              author: {
                name: `${message.author.tag}[UGC]`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL,
              },
              description: message.content,
              fields: [
                {
                  name: "\u200b",
                  value: `**${message.reply.user.tag}>>** ${message.reply.content || "なし"}`
                }
              ],
              footer: {
                text: `${message.guild.name}<${message.guild.id}>`,
                icon_url: message.guild.iconURL
              },
              image: {
                url: `https://${message.id}.ugc`
              },
              timestamp: new Date()
            },
            {
              title: message.attachments.attachment[0].name,
              image: {
                url: message.attachments.attachment[0].url
              }
            }
          ]
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
    }else{//添付ファイルあり(画像以外)
      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: "RANDOM",
              author: {
                name: `${message.author.tag}[UGC]`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL,
              },
              description: message.content,
              footer: {
                text:`${message.guild.name}<${message.guild.id}>` ,
                icon_url: message.guild.iconURL
              },
              fields: [
                {
                  name: "添付ファイル",
                  value: `[${message.attachments.attachment[0].name}](${message.attachments.attachment[0].url})`
                },
                {
                  name: "\u200b",
                  value: `**${message.reply.user.tag}>>** ${message.reply.content || "なし"}`
                }
              ],
              image: {
                url: `https://${message.id}.ugc`
              },
              timestamp: new Date()
            }
          ]
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
    }
  }
}

function err(channels,client,error){
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const fs = require("fs");
  
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
        icon_url: "https://cdn.taka.ml/images/system/error.png",
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
}