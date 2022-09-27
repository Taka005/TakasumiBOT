async function system(interaction,client){
  const config = require("../../config.json");
  const point_user = require("../../data/point.json");
  const block_user = require("../../data/block_user.json");
  const block_server = require("../../data/block_server.json");
  const main = require("../../data/global/main.json");
  const sub = require("../../data/global/sub.json");
  const { WebhookClient } = require("discord.js");
  const fs = require("fs");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "system"){
    const id = await interaction.options.getString("id");
    const functions = await interaction.options.getString("functions");
    const message = await interaction.options.getString("message") || "なし"

    if(interaction.member.user.id !== config.admin) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドは、関係者以外実行できません"
      }],
      ephemeral:true
    });

    const id_data = id.match(/\d{18,19}/g);
    if(!id_data) return await interaction.reply({
      embeds:[{
        author: {
          name: "引数が無効です",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "ユーザー又はサーバーIDを指定する必要があります"
      }],
      ephemeral:true
    });

    if(functions === "leave"){//サーバーから脱退する
      const guild = client.guilds.cache.get(id_data[0]);
      if(!guild) return await interaction.reply({
        embeds:[{
          author: {
            name: "サーバーから脱退できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "指定したサーバーが存在しません"
        }],
        ephemeral:true
      });

      guild.leave()
        .then(async (g)=>{
          return await interaction.reply({
            embeds:[{
              author: {
                name: `${g.name} から脱退しました`,
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN"
            }]
          })
        })
        .catch(async (error)=>{
          return await interaction.reply({
            embeds:[{
              author: {
                name: "サーバーから脱退できませんでした",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: `\`\`\`${error}\`\`\``
            }],
            ephemeral:true
          });
        });
      return;

    }else if(functions === "delete"){//グローバルチャットの登録情報を削除
      const guild = client.guilds.cache.get(id_data[0]);
      if(!guild) return await interaction.reply({
        embeds:[{
          author: {
            name: "登録情報を削除できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "指定したサーバーが存在しません"
        }],
        ephemeral:true
      });
  
      if(!sub[id_data]) return await interaction.reply({
        embeds:[{
          author: {
            name: "登録情報を削除できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "指定されたサーバーは登録されていません"
        }],
        ephemeral:true
      });
      const channel = sub[id_data];

      const webhooks = new WebhookClient({id: main[channel][0], token: main[channel][1]});
      await webhooks.delete()
        .then(async ()=>{
          delete main[channel];
          delete sub[id_data];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
  
          await interaction.reply({
            embeds:[{
                author: {
                  name: `${guild.name} の登録の削除が完了しました`,
                  icon_url: "https://taka.ml/images/success.png",
                },
                color: "GREEN"
              }]
            });
          })
        .catch(async ()=>{
          delete main[channel];
          delete sub[id_data];
          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          fs.writeFileSync("./data/global/sub.json", JSON.stringify(sub), "utf8");
  
          await interaction.reply({
            embeds:[{
              author: {
                name: `${guild.name} の登録の削除が完了しました`,
                icon_url: "https://taka.ml/images/success.png",
              },
              description: "※webhookは既に削除済みのため、\n登録情報のみ削除しました",
              color: "GREEN"
            }]
          })
        });

      client.channels.cache.get(channel).send({
        embeds:[{
          author: {
            name: "登録情報が削除されました",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "グローバルチャットは、管理者によって強制的に切断されました\n再度登録するには`/global`を使用してください"
        }]
      })
      .catch(()=>{})

      delete require.cache[require.resolve("../../data/global/sub.json")];
      delete require.cache[require.resolve("../../data/global/main.json")];
      return;

    }else if(functions === "block_server"){//ブロックサーバーを追加する
      const guild = client.guilds.cache.get(id_data[0]);
      if(!guild) return await interaction.reply({
        embeds:[{
          author: {
            name: "サーバーをブロックできませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "指定したサーバーが存在しません"
        }],
        ephemeral:true
      });
  
      if(block_server[id_data[0]]){//登録済み
        delete block_server[id_data[0]];
        fs.writeFileSync("./data/block_server.json", JSON.stringify(block_server), "utf8");
        delete require.cache[require.resolve("../../data/block_server.json")];
  
        return await interaction.reply({
          embeds:[{
            author: {
              name: `${guild.name} のブロックを解除しました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        });
      }
  
      //登録なし
      block_server[id_data[0]] = message;
      fs.writeFileSync("./data/block_server.json", JSON.stringify(block_server), "utf8");
      delete require.cache[require.resolve("../../data/block_server.json")];

      await interaction.reply({
        embeds:[{
          author: {
            name: `${guild.name} をブロックしました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      });
      return;

    }else if(functions === "block_user"){//ブロックユーザーを追加する
      let user
      try{
        user = await client.users.fetch(id_data[0]);
      }catch{
        return interaction.reply({
          embeds:[{
            author: {
              name: "ユーザーをミュートできませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "指定したユーザーが存在しません"
          }],
          ephemeral:true
        });
      }
  
      if(block_user[id_data[0]]){//登録済み
        delete block_user[id_data[0]];
        fs.writeFileSync("./data/block_user.json", JSON.stringify(block_user), "utf8");
        delete require.cache[require.resolve("../../data/block_user.json")];
  
        return interaction.reply({
          embeds:[{
            author: {
              name: `${user.tag} のブロックを解除しました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        });
      }
      
      //登録なし
      block_user[id_data[0]] = message;
      fs.writeFileSync("./data/block_user.json", JSON.stringify(block_user), "utf8");
      delete require.cache[require.resolve("../../data/block_user.json")];
  
      interaction.reply({
        embeds:[{
          author: {
            name: `${user.tag} のブロックしました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      });
      return;

    }else if(functions === "dm"){//DMを送信する
      let user
      try{
        user = await client.users.fetch(id_data[0]);
      }catch{
        return interaction.reply({
          embeds:[{
            author: {
              name: "ユーザーにDMを送信できませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "指定したユーザーが存在しません"
          }],
          ephemeral:true
        });
      }

      user.send(`${message}`)
        .then(async ()=>{
          await interaction.reply({
            embeds:[{
              author: {
                name: `${user.tag} にDMを送信しました`,
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN",
              description: `内容:${message}`
            }],
            ephemeral:true
          })
        })
        .catch(async ()=>{
          await interaction.reply({
            embeds:[{
              author: {
                name: "送信に失敗しました",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED",
              description: "ユーザーがDMを有効にしていません"
            }],
            ephemeral:true
          })
        });
      return;

    }else if(functions === "point"){
      try{
        const user = await client.users.fetch(id_data[0]);
        point_user[id_data] = message;
        fs.writeFileSync("./data/point.json", JSON.stringify(point_user), "utf8");
        delete require.cache[require.resolve("../../data/point.json")];
  
        await interaction.reply({
          embeds:[{
            author: {
              name: `${user.tag} の評価を${message}に変更しました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }],
          ephemeral:true
        });
      }catch{
        await interaction.reply({
          embeds:[{
            author: {
              name: "指定したユーザーが存在しません",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "指定したIDが無効です"
          }],
          ephemeral:true
        });
      }
      return;

    }
  }
}

module.exports = system