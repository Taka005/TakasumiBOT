async function global(interaction){
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const mute_user = require("../../data/block_user.json");
  const mute_server = require("../../data/block_server.json");
  const fs = require("fs");
  const { WebhookClient } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "global"){

    if(mute_server[interaction.guild.id] && !sub[interaction.guild.id] || mute_user[interaction.member.user.id] && !sub[interaction.guild.id]) return await interaction.reply({
      embeds:[{
        author: {
          name: "登録のできません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        description: "このサーバーもしくは、あなたはブラックリストに登録されているため、登録、利用はできません",
        color: "RED"
      }],
      ephemeral:true
    });

    if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`チャンネルを管理`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_WEBHOOKS")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("ADD_REACTIONS")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_CHANNELS")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "グローバルチャットは、BOTに以下の権限が必要です\n```リアクションの追加\nテキストチャンネルの閲覧\nメッセージを送信\nウェブフックの管理\nチャンネルの管理```\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
      }],
      ephemeral:true
    });

    if(
      interaction.guild.memberCount < 30||
      (await interaction.guild.members.fetch()).filter(m => !m.user.bot).size < 15
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "参加条件を満たしていません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "グローバルチャットを利用するには、以下の条件を満たしている必要があります```20人以上のメンバー\n8人以上のユーザー```"
      }],
      ephemeral:true
    });

    if(!main[interaction.channel.id] && sub[interaction.guild.id]) return await interaction.reply({
      embeds:[{
        author: {
          name: "既に登録済みです",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "グローバルチャットは、一つのサーバーに付き\nひとつまでしか設定出来ません"
      }],
      ephemeral:true
    });

    if(main[interaction.channel.id]){//登録済み
      const webhooks = new WebhookClient({id: main[interaction.channel.id][0], token: main[interaction.channel.id][1]});
      await webhooks.delete()
        .then(async()=>{

          delete main[interaction.channel.id];
          delete sub[interaction.guild.id];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");

          await interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: "登録の削除が完了しました",
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN"
            }]
          });
        })
        .catch(async()=>{

          delete main[interaction.channel.id];
          delete sub[interaction.guild.id];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");

          await interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: "登録の削除が完了しました",
                icon_url: "https://taka.ml/images/success.png",
              },
              description: "※webhookは既に削除済みのため、\n登録情報のみ削除しました",
              color: "GREEN"
            }]
          })
        });

      interaction.channel.setTopic("")
        .catch(()=>{})

      delete require.cache[require.resolve("../../data/global/sub.json")];
      delete require.cache[require.resolve("../../data/global/main.json")];
      return;
    }
    
    //登録なし
    await interaction.deferReply()
    await interaction.channel.createWebhook("TakasumiBOT",{
      avatar: "https://taka.ml/images/bot.png",
    })
      .then(async (webhook) =>{
        interaction.channel.setTopic("ここはTakasumiグローバルチャットです\nこのチャンネルに入力された内容は、登録チャンネル全部に送信されます\n\nチャットを利用する前に\nhttps://taka.ml/bot/takasumi.html をご確認ください")
            .catch(()=>{})

        main[interaction.channel.id] = [webhook.id,webhook.token,interaction.guild.id];
        sub[interaction.guild.id] = interaction.channel.id;
        fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
        fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");

        Object.keys(main).forEach(async(channels)=>{
          
          const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
          if(channels === interaction.channel.id||mute_server[guild]) return;

          const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
          await webhooks.send({
            embeds:[{
              color: "GREEN",
              title: `${interaction.guild.name}<${interaction.guild.id}>`,
              thumbnail: {
                url: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              description: "グローバルチャットに新しいサーバーが参加しました！\nみんなで挨拶してみましょう!",
              footer: {
                text: `登録数:${Object.keys(main).length}`
              },
              timestamp: new Date()
            }]
          }).catch(()=>{
            delete main[channels];
            const guild = Object.keys(sub).filter((key)=> sub[key] === channels);
            delete sub[guild];

            fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
            fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
            delete require.cache[require.resolve("../../data/global/sub.json")];
            delete require.cache[require.resolve("../../data/global/main.json")];
          })
        });

        await interaction.followUp({
          embeds:[{
            color: "GREEN",
            author: {
              name: `${interaction.guild.name}`,
              icon_url: "https://taka.ml/images/success.png"
            },
            description: `グローバルチャットに新しいサーバーを追加しました\nみんなに挨拶してみましょう!\nこのチャンネルに入力された内容は、登録チャンネル全てに送信されます\n\n※チャットを利用した場合、[利用規約](http://taka.ml/bot/takasumi.html)に同意されたことになります。必ずご確認ください`,
            timestamp: new Date()
          }]
        })
      })
      .catch(async(error)=>{
        await interaction.followUp({
          embeds:[{
            author: {
              name: "作成に失敗しました",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: `BOTの権限が不足しているか,\n既にwebhookの作成回数が上限に達しています`,
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }]
        })
      });

      delete require.cache[require.resolve("../../data/global/main.json")];
      delete require.cache[require.resolve("../../data/global/sub.json")];
  }
}
  
module.exports = global