module.exports = async(interaction,client)=>{
  const { admin } = require("../../config.json");
  const mysql = require("../lib/mysql");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const { WebhookClient } = require("discord.js");
  const fs = require("fs");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "system"){
    const id = interaction.options.getString("id");
    const functions = interaction.options.getString("functions");
    const message = interaction.options.getString("message") || "なし"

    if(interaction.member.user.id !== admin) return await interaction.reply({
      embeds:[{
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドは関係者以外実行できません"
      }],
      ephemeral: true
    });

    const id_data = id.match(/\d{18,19}/g);
    if(!id_data) return await interaction.reply({
      embeds:[{
        author:{
          name: "引数が無効です",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "ユーザー又はサーバーIDを指定する必要があります"
      }],
      ephemeral: true
    });

    if(functions === "leave"){//サーバーから脱退する
      const guild = client.guilds.cache.get(id_data[0]);
      if(!guild) return await interaction.reply({
        embeds:[{
          author:{
            name: "サーバーから脱退できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "指定したサーバーが存在しません"
        }],
        ephemeral: true
      });

      guild.leave()
        .then(async(g)=>{
          await interaction.reply({
            embeds:[{
              author:{
                name: `${g.name} から脱退しました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png"
              },
              color: "GREEN"
            }]
          })
        })
        .catch(async(error)=>{
          await interaction.reply({
            embeds:[{
              author:{
                name: "サーバーから脱退できませんでした",
                icon_url: "https://cdn.taka.ml/images/system/error.png"
              },
              color: "RED",
              description: `\`\`\`${error}\`\`\``
            }],
            ephemeral: true
          });
        });

    }else if(functions === "delete"){//グローバルチャットの登録情報を削除
      const guild = client.guilds.cache.get(id_data[0]);
      if(!guild) return await interaction.reply({
        embeds:[{
          author:{
            name: "登録情報を削除できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "指定したサーバーが存在しません"
        }],
        ephemeral: true
      });
  
      if(!sub[id_data]) return await interaction.reply({
        embeds:[{
          author:{
            name: "登録情報を削除できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "指定されたサーバーは登録されていません"
        }],
        ephemeral: true
      });
      const channel = sub[id_data];

      const webhooks = new WebhookClient({id: main[channel][0], token: main[channel][1]});
      await webhooks.delete()
        .then(async()=>{
          delete main[channel];
          delete sub[id_data];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
  
          await interaction.reply({
            embeds:[{
                author:{
                  name: `${guild.name} の登録の削除が完了しました`,
                  icon_url: "https://cdn.taka.ml/images/system/success.png"
                },
                color: "GREEN"
              }]
            });
          })
        .catch(async()=>{
          delete main[channel];
          delete sub[id_data];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
  
          await interaction.reply({
            embeds:[{
              author:{
                name: `${guild.name} の登録の削除が完了しました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png"
              },
              description: "※webhookは既に削除済みのため、\n登録情報のみ削除しました",
              color: "GREEN"
            }]
          })
        });

      client.channels.cache.get(channel).send({
        embeds:[{
          author:{
            name: "登録情報が削除されました",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "グローバルチャットは、管理者によって強制的に切断されました\n再度登録するには`/global`を使用してください"
        }]
      }).catch(()=>{});

      delete require.cache[require.resolve("../../data/global/sub.json")];
      delete require.cache[require.resolve("../../data/global/main.json")];

    }else if(functions === "mute_server"){//ミュートサーバーを追加する
      const data = await mysql(`SELECT * FROM mute_server WHERE id = ${id_data[0]} LIMIT 1;`);
      if(data[0]){//登録済み
        await mysql(`DELETE FROM mute_server WHERE id = ${id_data[0]} LIMIT 1;`);
  
        await interaction.reply({
          embeds:[{
            author:{
              name: `${id_data[0]} のミュートを解除しました`,
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{//登録なし
        await mysql(`INSERT INTO mute_server (id, reason, time) VALUES("${id_data[0]}","${message||"なし"}",NOW())`);

        await interaction.reply({
          embeds:[{
            author:{
              name: `${id_data[0]} をミュートしました`,
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }
    }else if(functions === "mute_user"){//ミュートユーザーを追加する
      let user
      try{
        user = await client.users.fetch(id_data[0]);
      }catch{
        return await interaction.reply({
          embeds:[{
            author:{
              name: "ユーザーをミュートできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "指定したユーザーが存在しません"
          }],
          ephemeral: true
        });
      }
  
      const data = await mysql(`SELECT * FROM mute_user WHERE id = ${id_data[0]} LIMIT 1;`);
      if(data[0]){//登録済み
        await mysql(`DELETE FROM mute_user WHERE id = ${id_data[0]} LIMIT 1;`);
  
        await interaction.reply({
          embeds:[{
            author:{
              name: `${user.tag} のミュートを解除しました`,
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{//登録なし
        await mysql(`INSERT INTO mute_user (id, reason, time) VALUES("${id_data[0]}","${message||"なし"}",NOW())`);

        await interaction.reply({
          embeds:[{
            author:{
              name: `${user.tag} をミュートしました`,
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }
    }else if(functions === "dm"){//DMを送信する
      let user
      try{
        user = await client.users.fetch(id_data[0]);
      }catch{
        return await interaction.reply({
          embeds:[{
            author:{
              name: "ユーザーにDMを送信できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "指定したユーザーが存在しません"
          }],
          ephemeral: true
        });
      }

      user.send(`${message}`)
        .then(async()=>{
          await interaction.reply({
            embeds:[{
              author:{
                name: `${user.tag} にDMを送信しました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png"
              },
              color: "GREEN",
              description: `内容:${message}`
            }],
            ephemeral: true
          })
        })
        .catch(async()=>{
          await interaction.reply({
            embeds:[{
              author:{
                name: "送信に失敗しました",
                icon_url: "https://cdn.taka.ml/images/system/error.png"
              },
              color: "RED",
              description: "ユーザーがDMを有効にしていません"
            }],
            ephemeral: true
          })
        });

    }
  }
}