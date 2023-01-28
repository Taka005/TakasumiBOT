module.exports = async(message,client)=>{
  const mysql = require("../lib/mysql");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const spam = require("../lib/spam");
  const { WebhookClient, MessageButton, MessageActionRow } = require("discord.js");
  const async = require("async");
  
  if(
    !message.channel.type === "GUILD_TEXT"||
    message.author.bot||
    !main[message.channel.id]||
    !message.reference?.messageId
  ) return;

  const mute_server = await mysql(`SELECT * FROM mute_server WHERE id = ${message.guild.id} LIMIT 1;`);
  const mute_user = await mysql(`SELECT * FROM mute_user WHERE id = ${message.author.id} LIMIT 1;`);

  const account = await mysql(`SELECT * FROM account WHERE id = ${message.author.id} LIMIT 1;`);
  if(!account[0]){
    await message.reply({ 
      embeds:[{
        author: {
          name: "利用規約に同意してください",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "以下のリンクから認証を行うことでグローバリチャットを利用できます\n認証が完了すると[利用規約](https://gc.taka.ml/)に同意したものとみなします",
      }], 
      components: [
        new MessageActionRow()
          .addComponents( 
            new MessageButton()
              .setLabel("サイトへ飛ぶ")
              .setURL("https://auth.taka.ml/")
              .setStyle("LINK"))
          .addComponents( 
            new MessageButton()
              .setLabel("サポートサーバー")
              .setURL("https://discord.gg/NEesRdGQwD")
              .setStyle("LINK"))
      ]
    });
  }
  
  if(
    mute_server[0]||
    mute_user[0]||
    message.content.length > 300||
    spam(message)
  ){
    return message.react("❌")
      .catch(()=>{}) 
  }

  const content = message.content
    .replace(/(?:https?:\/\/)?(?:discord\.(?:gg|io|me|li)|(?:discord|discordapp)\.com\/invite)\/(\w+)/g,"[[招待リンク]](https://discord.gg/NEesRdGQwD/)")

  await message.react("🔄")
    .catch(()=>{});

  try{
    const reply_webhooks = new WebhookClient({id: main[message.channel.id][0], token: main[message.channel.id][1]});
    const msg = await reply_webhooks.fetchMessage(message.reference.messageId);
    const author = msg.embeds[0].author.name

    if(!message.attachments.first()){
      async.each(Object.keys(main),async(channels)=>{//添付ファイルなし
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: (await message.author.fetch()).hexAccentColor || "RANDOM",
              author: {
                name: `${message.author.tag}`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
              },
              description: `${content}`,
              fields: [
                {
                  name: "\u200b",
                  value: `**${author}>>** ${msg.embeds[0].description || "なし"}`
                }
              ],
              footer: {
                text:`${message.guild.name}<${message.guild.id}>`,
                icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
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
      await message.react("✅")
        .catch(()=>{});
      return;
    }else if(message.attachments.first().height && message.attachments.first().width){//添付ファイルあり(画像)
      const attachment = message.attachments.map(attachment => attachment);
      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: (await message.author.fetch()).hexAccentColor || "RANDOM",
              author: {
                name: `${message.author.tag}`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
              },
              description: `${content}`,
              fields: [
                {
                  name: "\u200b",
                  value: `**${author}>>** ${msg.embeds[0].description || "なし"}`
                }
              ],
              footer: {
                text: `${message.guild.name}<${message.guild.id}>`,
                icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
              },
              image: {
                url: `https://${message.id}.ugc`
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
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
      await message.react("✅")
        .catch(()=>{});
      return;
    }else{//添付ファイルあり(画像以外)
      const attachment = message.attachments.map(attachment => attachment);

      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: (await message.author.fetch()).hexAccentColor || "RANDOM",
              author: {
                name: `${message.author.tag}`,
                url: `https://discord.com/users/${message.author.id}`,
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
                  value: `**${author}>>** ${msg.embeds[0].description || "なし"}`
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
      await message.react("✅")
        .catch(()=>{});
      return;
    }
  }catch{//同じサーバーでの返信
    const msg = await message.channel.messages.fetch(message.reference.messageId)
      .catch(()=>{});

    if(!message.attachments.first()){
      async.each(Object.keys(main),async(channels)=>{//添付ファイルなし
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: (await message.author.fetch()).hexAccentColor || "RANDOM",
              author: {
                name: `${message.author.tag}`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
              },
              description: `${content}`,
              fields: [
                {
                  name: "\u200b",
                  value: `**${msg.author.tag}>>** ${msg.content || "なし"}`
                }
              ],
              footer: {
                text:`${message.guild.name}<${message.guild.id}>`,
                icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
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
      await message.react("✅")
        .catch(()=>{});
    }else if(message.attachments.first().height && message.attachments.first().width){//添付ファイルあり(画像)
      const attachment = message.attachments.map(attachment => attachment);
      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;

        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: (await message.author.fetch()).hexAccentColor || "RANDOM",
              author: {
                name: `${message.author.tag}`,
                url: `https://discord.com/users/${message.author.id}`,
                icon_url: message.author.avatarURL()||"https://cdn.discordapp.com/embed/avatars/0.png",
              },
              description: `${content}`,
              fields: [
                {
                  name: "\u200b",
                  value: `**${msg.author.tag}>>** ${msg.content || "なし"}`
                }
              ],
              footer: {
                text: `${message.guild.name}<${message.guild.id}>`,
                icon_url:message.guild.iconURL() ||"https://cdn.discordapp.com/embed/avatars/0.png"
              },
              image: {
                url: `https://${message.id}.ugc`
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
        }).catch((error)=>{
          err(channels,client,error);
        });
      });
      await message.react("✅")
        .catch(()=>{});
    }else{//添付ファイルあり(画像以外)
      const attachment = message.attachments.map(attachment => attachment);

      async.each(Object.keys(main),async(channels)=>{
        const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
        const mute = await mysql(`SELECT * FROM mute_server WHERE id = ${guild} LIMIT 1;`);
        if(channels === message.channel.id||mute[0]) return;
        
        const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
        await webhooks.send({
          embeds:[
            {
              color: (await message.author.fetch()).hexAccentColor || "RANDOM",
              author: {
                name: `${message.author.tag}`,
                url: `https://discord.com/users/${message.author.id}`,
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
                  value: `**${msg.author.tag}>>** ${msg.content || "なし"}`
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
      await message.react("✅")
        .catch(()=>{});
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