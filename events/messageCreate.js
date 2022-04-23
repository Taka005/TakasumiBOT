function messageCreate(client) {
  const fs = require('fs');
  const os 	= require('os');
  
  client.on('messageCreate', async (message) => { 
    //時間
    var now = new Date();
    var h = now.getHours()
    var m = now.getMinutes()
    var s = now.getSeconds() 
    //変数
    const reply = `<@!${message.author.id}>`
    const prefix = ">"
    if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
    //console.log
        console.log(`[${h}:${m}:${s}]MESSAGE:(`+message.author.tag+`)`+message.content+` [PING:${client.ws.ping}ms`);
    //fs.log
        fs.appendFileSync('./log.txt', `\n[${h}:${m}:${s}]MESSAGE:(`+message.author.tag+`)`+message.content+` [PING:${client.ws.ping}ms`, (err) => {
          if(err) {
            console.log(err);
          }
        }); 
      
        //textのみ
        if(!message.content.startsWith(prefix)) return  
        //say  
        if(message.content.startsWith(">say")){
          const args = message.content.slice(5);
            message.delete()     
            message.channel.send(`${args.replace("@","＠") || "NONE"}`)
          return;
        }
        //join
        if(message.content === `${prefix}join`){
          const period = Math.round((Date.now() - message.member.joinedAt) / 86400000) 
          message.reply(message.author.tag+`は${message.guild.name}に約${period}日間サーバーに参加しています`)
          return;
        }
        //avater
        if (message.content.startsWith(">avatar")) {
          if(message.content == ">avatar"){
            message.channel.send(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png")
            return;
          }
          try{
            const args = message.content.split(" ").slice(1);
            var user = await client.users.fetch(args[0])
            message.channel.send(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png")
              .catch(e =>{return message.channel.send(`${reply}アイコンが取得出来ませんでした`)})
          }catch(err){
            message.channel.send(`${reply}ユーザーが取得できませんでした。`)
          }
          return;
        }
        //timer
        if(message.content.startsWith(`>timer`)){
          const args = message.content.split(" ").slice(1);
          if (!args[0]) return message.reply("`>timer`の後に数字が必要です");
            if(isNaN(args)) return message.reply("数字を入力してください");
            if (args < 1 || args > 300) return message.reply("設定値は1以上、300以下にしてください")   
              message.channel.send(`タイマーを${args}秒に設定しました。`)
              setTimeout(() => {
                message.reply(`${args}秒経ちました`)
              }, args * 1000) 
          return;
        }
        //del
        if(message.content.startsWith(">del")){//delコマンド
          const args = message.content.split(" ").slice(1);
            message.delete()
          if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${reply}>delを使う権限がありません`);
            if (!args[0]) return message.channel.send(`${reply}削除する数を指定してください`);
            if(isNaN(args)) return message.channel.send(`${reply}数字を入力してください`)
            if (args < 2 || args > 80 ) return message.channel.send(`${reply}削除する数は2以上、80以下にしてください`)   
              var messages = await message.channel.messages.fetch({ limit: args })         
                message.channel.bulkDelete(messages)
                  .then(() => message.channel.send(`${reply}${args}個のメッセージを削除しました。`))
                  .catch(e => message.channel.send(`${reply}削除できないメッセージが含まれています`)) 
          return;
        }
        //draw
        if(message.content === `${prefix}draw`){
          var arr = ["大吉", "中吉", "小吉","小吉", "吉","吉","吉","凶", "大凶"];
          var random = Math.floor(Math.random() * arr.length);
          var result = arr[random];
            message.reply({
              embeds:[{
                color: "RANDOM",
                description: `${result}`
              }]
            });
          return;
        }
        //pc
        if(message.content === `${prefix}cpu`){
          var cpus = ["Ryzen 9 5950X", "Core i9 12900KS", "Apple M1 Ultra", "Apple M1 Ultra", "Core i9 12900KF", "Core i9 12900K", "Core i9 12900K", "Ryzen 9 5900X", "Ryzen 9 3950X", "Core i9 12900", "Core i9 12900F", "Ryzen 9 5900", "Ryzen 9 5900", "Core i7 12700KF", "Core i7 12700K", "Ryzen 9 3900XT", "Core i7 12700", "Core i7 12700F", "Ryzen 9 3900", "Ryzen 7 5800X", "Core i5 12600KF", "Core i5 12600K", "Ryzen 7 5700X", "Ryzen 7 5800", "Core i9 11900KF", "Core i9 11900K", "Ryzen 7 PRO 5750G", "Core i7 11700K", "Ryzen 7 5700G", "Core i7 11700KF", "Ryzen 7 3800XT", "Core i9 10900K", "Core i9 11900F", "Core i9 10900KF", "Core i9 11900", "Ryzen 7 3800X", "Core i9 10850K", "Core i9 11900F", "Core i9 10900KF", "Core i9 11900", "Ryzen 7 3800X", "Core i9 10850K", "Ryzen 7 3700X", "Ryzen 5 5600X", "Ryzen 5 5600", "Core i5 12600", "Ryzen 7 4700G", "Core i7 11700F", "Core i7 11700", "Ryzen 5 PRO 5650G", "Core i9 10900", "Ryzen 7 PRO 4750G", "Core i9 10900F", "Core i5 12500", "Ryzen 5 5600G", "Core i9 9900KS", "Core i5 11600K", "Core i5 12400", "Core i5 11600KF", "Core i5 12400", "Core i5 11600KF", "Ryzen 7 PRO 4750GE", "Core i5 12400F", "Ryzen 5 5500", "Core i7 10700K", "Core i7 10700KF", "Ryzen 5 3600XT", "Core i9 9900K", "Core i9 9900KF", "Ryzen 5 3600X", "Core i7 10700", "Core i7 10700F", "Core i5 11500", "Ryzen 5 3600", "AMD 4700S", "Core i5 11400", "Core i5 11400F", "Ryzen 7 2700X", "Core i9 9900", "Ryzen 5 4600G", "Ryzen 5 PRO 4650G", "Ryzen 5 PRO 4650G", "Ryzen 5 PRO 4650GE", "Ryzen 7 2700", "Ryzen 7 1700X", "Core i5 10600K", "Core i5 10600KF", "Apple M1 (Rosetta 2)", "Core i7 8086K", "Core i7 9700K", "Core i7 9700KF", "Ryzen 7 1700", "Ryzen 5 2600X", "Core i7 9700F", "Core i5 10600", "Ryzen 3 PRO 5350G", "Core i9 9900T", "Ryzen 3 5300G", "Core i7 9700", "Core i7 8700K", "Core i3 12100", "Core i3 12100F", "Ryzen 5 3500X", "Core i5 10500", "Core i7 8700", "Ryzen 5 2600", "Core i5 10400", "Core i5 10400F", "Ryzen 5 1600X", "Ryzen 5 1600 AF", "Ryzen 3 3300X", "Ryzen 5 3500", "Ryzen 5 1600", "Ryzen 5 1600", "Ryzen 3 3100", "Ryzen 3 4300G", "Ryzen 3 PRO 4350G", "Core i7 9700T", "Core i5 9600K", "Core i5 9600KF", "Core i7 8700T", "Core i5 9600", "Core i5 8600K", "Core i5 8600", "Core i7 7700K", "Core i5 9500", "Core i5 9400F", "Core i5 9400", "Ryzen 5 3400G", "Core i3 10300", "Core i5 8500", "Core i5 8400", "Core i3 10105F", "Core i3 10105", "Core i7 6700K", "Ryzen 5 1500X", "Core i3 10100", "Ryzen 5 2400G", "Core i3 10100F"];
          var random = Math.floor(Math.random() * cpus.length);
          var cpu = cpus[random];
            message.reply({
              embeds:[{
                color: "RANDOM",
                description: `${cpu}`
              }]
            });
          return;
        }
        //clock
        if(message.content === `${prefix}clock`){
          require('date-utils');     
            message.channel.send(now.toFormat('YYYY年MM月DD日')+`${h}時${m}分${s}秒`)
          return;
        }
        //bans
        if(message.content === `${prefix}bans`){
          const bans = await message.guild.bans.fetch()
            message.reply(bans.map(ban => ban.user.tag).join('\n') || 'このサーバーではBANされた人がいません')
          return;
        }
        //url
        if (message.content.startsWith(`>url`)) {
          const args = message.content.split(" ").slice(1);
          message.delete()
          if (!args[0]) return message.channel.send(`${reply}ファイルのURLが必要です`);
            message.channel.send({ files: args })
              .catch(e=>message.channel.send(`${reply}無効なURLまたはファイルではありません`))
          return;
        }
        //>
        if(message.content === ">" ){
          message.reply({
            embeds:[{
              title: "ようこそ！",
              description: "製作者:Taka005#1203\n" + "プレフィックスは`>`です",
              color: "WHITE",
              footer: {
                text: "サポートサーバー\n  https://discord.gg/GPs3npB63m"
              },
              fields: [
                {
                name: "**このBOTは？**",
                value: "雑用BOTでさまざまな機能があります\n大手BOTにはない機能などが備わっています"
                },
                {
                name: "**使うには？**",
                value: "`/help`で機能一覧を表示しましょう"
                },
                {
                name: "**わからない時には?**",
                value: "サポートサーバーへ行って聞いてきましょう\n入ってくれると製作者が喜びます"
                }
              ]
            }]
          })
          return;
        }
        //poll
        if (!message.content.startsWith(prefix)) return
          var usertag = message.author.tag;
          var [command, ...args] = message.content.slice(prefix.length).split(' ')
          if (command === 'poll') {
            const [title, ...choices] = args
              if (!title) return message.channel.send(`${reply}タイトルと選択肢を指定してください`)
                message.delete()
              const emojis = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹']
              if (choices.length < 2 || choices.length > emojis.length)
                return message.channel.send(`${reply}選択肢は2から${emojis.length}個を指定してください`)
              const poll = await message.channel.send({
                          embeds:[{
                            title: title,
                            color: "RANDOM",
                            description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n'),
                            timestamp: new Date(),
                            footer: {
                              text: `${usertag}によって送信`
                            }
                          }]
              });
            emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
            return;
        } 
        //status
        if(message.content === `${prefix}status`){
            //CPU
            
            //memory
            var ramfree = Math.round(os.freemem / 1000000);
            var ramtotal = Math.round(os.totalmem / 1000000);
            var ramuse = ramtotal - ramfree
            var rampercent = Math.round(ramuse / ramtotal * 100)

            //起動時間
            var timeup = os.uptime()
            var timeuphours = Math.round(timeup / 60);
            message.channel.send({
              embeds:[ {//埋め込み
                title: "ステータス",
                color: "BLUE",
                timestamp: new Date(),
                fields: [
                {
                name: "**DiscordBOT**",
                value: `${client.ws.ping}ミリ秒`
                },
                {
                  name: "**システム情報**",
                  value: `取得できませんでした`
                },
                {
                name: "**システム使用率**",
                value: `**CPU**\n取得出来ませんでした\n**メモリー**\n${ramuse} MB / ${ramtotal} MB ${rampercent}％\n`
                },
                {
                name: "**起動時間**",
                value: `${timeuphours}分`
                }
              ]
              }]}
            )
            return;
        }
        //user
        if(message.content.startsWith(`>user`)){
          if(message.content === `>user`){
            message.reply(
              {embeds:[{
                title: "ユーザー情報",
                color: 7506394,
                timestamp: new Date(),
                thumbnail: {
                  url: message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                fields: [
                  {
                    name: "**ユーザー名**",
                    value: `${message.author.tag}`
                  },
                  {
                    name: "**ユーザーID**",
                    value: `${message.author.id}`
                  },
                  {
                    name: "**ニックネーム**",
                    value: message.member.nickname || `設定されていません`
                  },
                  {
                    name: "**アカウント作成日**",
                    value: `${new Date(message.author.createdTimestamp).toLocaleDateString()}`
                  }
                ]
              }]
            })
            return;
          }
          try{
            const args = message.content.split(" ").slice(1);
            var user = await client.users.fetch(args[0])
            message.reply(
              {embeds:[{
                title: "ユーザー情報",
                color: 7506394,
                timestamp: new Date(),
                thumbnail: {
                  url: user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                fields: [
                  {
                    name: "**ユーザー名**",
                    value: `${user.tag}`
                  },
                  {
                    name: "**ユーザーID**",
                    value: `${user.id}`
                  },
                  {
                    name: "**アカウント作成日**",
                    value: `${new Date(user.createdTimestamp).toLocaleDateString()}`
                  },
                  {
                    name: "**BOT**",
                    value: `${user.bot}`
                  }
                ]
              }]
            })
            .catch(()=> message.channel.send(`${reply}ユーザーの取得中にエラーが発生しました`))
            return;
          }catch{
            message.channel.send(`${reply}ユーザーを取得出来ませんでした`)
            return;
          } 
        }
        //server
        if(message.content === `${prefix}server`){
          message.reply(
            {embeds:[{
              title: "サーバー情報",
              color: 7506394,
              timestamp: new Date(),
              thumbnail: {
                url: `${message.guild.iconURL()}`
              },
              fields: [
                {
                  name: "**サーバー名**",
                  value: `${message.guild.name}`
                },
                {
                  name: "サーバーID",
                  value: `${message.guild.id}`
                },
                {
                  name: "**サーバーの人数**",
                  value: `${message.guild.memberCount}人`
                },
                {
                  name: "**ロール**",
                  value: `${message.guild.roles.cache.map(r => r).join(' | ')}`
                }
              ]
            }]
          })
          return;
        }
        //channel
        if(message.content === `${prefix}channel`){
          message.reply(
            {embeds:[{
              title: "チャンネル情報",
              color: 7506394,
              timestamp: new Date(),
              fields: [
                {
                  name: "**送信したチャンネル名**",
                  value: `${message.channel.name}`
                },
                {
                  name: "チャンネルID",
                  value: `${message.channel.id}`
                }
              ]
            }]
          })
          return;
        }
        
        //error uncaughtException
        process.on('uncaughtException', (error) => {
          message.channel.send({
            embeds:[{
              color: "RED",
              title: `${error.name}`,
              description: "```"+`${error.message}`+"```",
              timestamp: new Date()
            }]
          })
          .then(()=>{return;})
          .catch(()=>{return;})
        })

        //error unhandledRejection
        process.on('unhandledRejection', (error) => {
          message.channel.send({
            embeds:[{
              color: "RED",
              title: `${error.name}`,
              description: "```"+`${error.message}`+"```",
              timestamp: new Date()
            }]
          })
          .then(()=>{return;})
          .catch(()=>{return;})
        })
        

      });
    return;
}

module.exports = messageCreate

/**
 * development by Taka005#1203
 *
 * please join the my discord server
 * https://discord.gg/GPs3npB63m
 */