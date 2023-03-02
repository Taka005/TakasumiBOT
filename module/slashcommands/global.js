module.exports = async(interaction)=>{
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const fs = require("fs");
  const mysql = require("../lib/mysql");
  const { WebhookClient, MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "global"){

    const mute_server = await mysql(`SELECT * FROM mute_server WHERE id = ${interaction.guild.id} LIMIT 1;`);
    const mute_user = await mysql(`SELECT * FROM mute_user WHERE id = ${interaction.member.user.id} LIMIT 1;`);

    if(
      mute_server[0]&&!sub[interaction.guild.id]||
      mute_user[0]&&!sub[interaction.guild.id]
    ) return await interaction.reply({
      embeds:[{
        author:{
          name: "登録できません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        description: "このサーバーもしくは、あなたはブラックリストに登録されているため、ご利用できません",
        color: "RED"
      }],
      ephemeral: true
    });

    if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return await interaction.reply({
      embeds:[{
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドを実行するには以下の権限を持っている必要があります",
        fields:[
          {
            name: "必要な権限",
            value: "```チャンネルの管理```"
          }
        ]
      }],
      ephemeral: true
    });

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_WEBHOOKS")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("ADD_REACTIONS")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_CHANNELS")
    ) return await interaction.reply({
      embeds:[{
        author:{
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドはBOTに以下の権限が必要です",
        fields:[
          {
            name: "必要な権限",
            value: "```リアクションの追加\nチャンネルの閲覧\nメッセージの送信\nウェブフックの管理\nチャンネルの管理```"
          }
        ]
      }],
      ephemeral: true
    });

    if(
      interaction.guild.memberCount < 20||
      (await interaction.guild.members.fetch()).filter(m => !m.user.bot).size < 8
    ) return await interaction.reply({
      embeds:[{
        author:{
          name: "参加条件を満たしていません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "グローバルチャットを利用するには以下の条件を満たしている必要があります",
        fields:[
          {
            name: "必要な条件",
            value: "```20人以上のメンバー\n8人以上のユーザー```"
          }
        ]
      }],
      ephemeral: true
    });

    if(!main[interaction.channel.id]&&sub[interaction.guild.id]) return await interaction.reply({
      embeds:[{
        author:{
          name: "既に登録済みです",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "グローバルチャットは、一つのサーバーに付き\nひとつまでしか登録出来ません"
      }],
      ephemeral: true
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
            content: `<@${interaction.member.user.id}>`,
            embeds:[{
              author:{
                name: "登録の削除が完了しました",
                icon_url: "https://cdn.taka.ml/images/system/success.png"
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
            content: `<@${interaction.member.user.id}>`,
            embeds:[{
              author:{
                name: "登録の削除が完了しました",
                icon_url: "https://cdn.taka.ml/images/system/success.png"
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
    }else{//登録なし
      await interaction.deferReply();
      await interaction.editReply({
        embeds:[{
          color: "GREY",
          description: "登録情報を確認、登録中....",
        }]
      });
      await interaction.channel.createWebhook("TakasumiBOT",{
        avatar: "https://cdn.taka.ml/images/bot.png",
      })
        .then(async(webhook)=>{
          interaction.channel.setTopic("ここはTakasumiグローバルチャットです\nこのチャンネルに入力された内容は、登録チャンネル全部に送信されます\n\nチャットを利用する前に\n[利用規約](https://gc.taka.ml/ )をご確認ください")
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
                thumbnail:{
                  url: interaction.guild.iconURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
                },
                description: "グローバルチャットに新しいサーバーが参加しました！\nみんなで挨拶してみましょう!",
                footer:{
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

          await interaction.editReply({
            embeds:[{
              color: "GREEN",
              author:{
                name: `${interaction.guild.name}`,
                icon_url: "https://cdn.taka.ml/images/system/success.png"
              },
              description: `グローバルチャットに新しいサーバーを追加しました\nみんなに挨拶してみましょう!\nこのチャンネルに入力された内容は、登録チャンネル全てに送信されます\n\n※チャットを利用した場合、[利用規約](http://taka.ml/bot/takasumi.html)に同意されたことになります。必ずご確認ください`,
              timestamp: new Date()
            }]
          });
      })
      .catch(async(error)=>{
        await interaction.editReply({
          embeds:[{
            author:{
              name: "作成に失敗しました",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: `BOTの権限が不足しているか,\n既にwebhookの作成回数が上限に達しています`,
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          components:[
            new MessageActionRow()
              .addComponents( 
                new MessageButton()
                  .setLabel("サポートサーバー")
                  .setURL("https://discord.gg/NEesRdGQwD")
                  .setStyle("LINK"))
          ]
        });
      });

      delete require.cache[require.resolve("../../data/global/main.json")];
      delete require.cache[require.resolve("../../data/global/sub.json")];
    }
  }
}