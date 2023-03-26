module.exports = async(interaction)=>{
  const { WebhookClient, MessageButton, MessageActionRow } = require("discord.js");
  const mysql = require("../lib/mysql");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "setting"){

    if(interaction.options.getSubcommand() === "help"){//Help画面
      await interaction.reply({
        embeds:[{
          title: "HELP 設定",
          color: "GREEN",
          description: "設定の変更には`管理者`の権限が必要です",
          fields:[
            {
              name: "/setting bump",
              value: "BUMPの時間に通知するロールを設定します"
            },
            {
              name: "/setting dissoku",
              value: "Dissoku UPの時間に通知するロールを設定します"
            },
            {
              name: "/setting join",
              value: "参加メッセージの設定をします\n\n利用可能な変数\n[User] ユーザーメンション\n[UserName] ユーザーの名前\n[UserID] ユーザーID\n[ServerName] サーバーの名前\n[ServerID] サーバーID\n[Count] メンバー数"
            },
            {
              name: "/setting leave",
              value: "退出メッセージの設定をします\n`/setting join`と同じ変数を利用できます"
            },
            {
              name: "/setting ignore",
              value: "メッセージ展開、Bump通知、Dissoku通知の無効化と有効化を切り替えます\n有効にするとBump通知、Dissoku通知の設定情報は削除されます"
            },
            {
              name: "/setting delete",
              value: "データベースに登録されているサーバーの設定情報を全て削除します\n**この操作は元に戻せません**"
            }
          ]
        }]
      });
    }else if(interaction.options.getSubcommand() === "bump"){//BUMPロール設定
      const role = interaction.options.getRole("role");

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
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
              value: "```管理者```"
            }
          ]
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
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
              value: "```チャンネルの閲覧\nメッセージの送信```"
            }
          ]
        }],
        ephemeral: true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM bump WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "通知ロールが設定されていません"
          }],
          ephemeral: true
        });

        await mysql(`DELETE FROM bump WHERE server = ${interaction.guild.id} LIMIT 1;`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{
        const bot = interaction.guild.members.cache.get("302050872383242240");
        if(!bot) return await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを有効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "このサーバーにDisboardが参加していません\nもし参加している場合はDisboardを操作してみてください"
          }],
          ephemeral: true
        });
  
        await mysql(`INSERT INTO bump (server, role, time) VALUES("${interaction.guild.id}","${role.id}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),role = VALUES (role),time = VALUES (time);`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを有効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN",
            description: `Bump通知に<@&${role.id}>に設定しました`
          }]
        });
      }

    }else if(interaction.options.getSubcommand() === "dissoku"){//Dissokuロール設定
      const role = interaction.options.getRole("role");

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
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
              value: "```管理者```"
            }
          ]
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
      ) return await interaction.reply({
        embeds:[{
          author:{
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "このコマンドはBOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```",
          fields:[
            {
              name: "必要な権限",
              value: "```チャンネルの閲覧\nメッセージの送信```"
            }
          ]
        }],
        ephemeral: true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM dissoku WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "通知ロールが設定されていません"
          }],
          ephemeral: true
        });

        await mysql(`DELETE FROM dissoku WHERE server = ${interaction.guild.id} LIMIT 1;`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{
        const bot = interaction.guild.members.cache.get("761562078095867916");
        if(!bot) return await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを有効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "このサーバーにDissokuが参加していません\nもし参加している場合はDissokuを操作してみてください"
          }],
          ephemeral: true
        });
  
        await mysql(`INSERT INTO dissoku (server, role, time) VALUES("${interaction.guild.id}","${role.id}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),role = VALUES (role),time = VALUES (time);`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを有効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN",
            description: `Dissoku通知に<@&${role.id}>に設定しました`
          }]
        });
      }
    }else if(interaction.options.getSubcommand() === "join"){//join
      const message = interaction.options.getString("message");

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
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
              value: "```管理者```"
            }
          ]
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("MANAGE_WEBHOOKS")
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
              value: "```チャンネルの閲覧\nメッセージの送信\nWebhookの管理```"
            }
          ]
        }],
        ephemeral: true
      });

      if(!message){
        const data = await mysql(`SELECT * FROM \`join\` WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "参加メッセージが設定されていません"
          }],
          ephemeral: true
        });

        await mysql(`DELETE FROM \`join\` WHERE server = ${interaction.guild.id} LIMIT 1;`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{
        if(message.length > 100) return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "メッセージは100文字以内にしてください"
          }],
          ephemeral: true
        });

        if(interaction.channel.type !== "GUILD_TEXT") return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "メッセージを送信するチャンネルはテキストチャンネルにしてください"
          }],
          ephemeral: true
        });

        await interaction.channel.createWebhook("TakasumiBOT",{
          avatar: "https://cdn.taka.ml/images/icon.png",
        })
          .then(async(webhook)=>{
            await mysql(`INSERT INTO \`join\` (server, channel, message, id, token, time) VALUES("${interaction.guild.id}","${interaction.channel.id}","${message}","${webhook.id}","${webhook.token}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),channel = VALUES (channel),message = VALUES (message),id = VALUES (id),token = VALUES (token),time = VALUES (time);`);
            await interaction.reply({
              embeds:[{
                author:{
                  name: "参加メッセージを設定しました",
                  icon_url: "https://cdn.taka.ml/images/system/success.png"
                },
                color: "GREEN",
                description: `送信メッセージ: ${message}`
              }]
            });
          })
          .catch(async(error)=>{
            await interaction.reply({
              embeds:[{
                author:{
                  name: "参加メッセージを設定できませんでした",
                  icon_url: "https://cdn.taka.ml/images/system/error.png"
                },
                color: "RED",
                description: "BOTの権限が不足しているか,\n既にwebhookの作成回数が上限に達しています",
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
          })
      }
    }else if(interaction.options.getSubcommand() === "leave"){//leave
      const message = interaction.options.getString("message");

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
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
              value: "```管理者```"
            }
          ]
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
        !interaction.guild.members.me.permissionsIn(interaction.channel).has("MANAGE_WEBHOOKS")
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
              value: "```チャンネルの閲覧\nメッセージの送信\nWebhookの管理```"
            }
          ]
        }],
        ephemeral: true
      });

      if(!message){
        const data = await mysql(`SELECT * FROM \`leave\` WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "退出メッセージが設定されていません"
          }],
          ephemeral: true
        });

        await mysql(`DELETE FROM \`leave\` WHERE server = ${interaction.guild.id} LIMIT 1;`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{
        if(message.length > 100) return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "メッセージは100文字以内にしてください"
          }],
          ephemeral: true
        });

        if(channel.type !== "GUILD_TEXT") return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "メッセージを送信するチャンネルはテキストチャンネルにしてください"
          }],
          ephemeral: true
        });

        await interaction.channel.createWebhook("TakasumiBOT",{
          avatar: "https://cdn.taka.ml/images/icon.png",
        })
          .then(async(webhook)=>{
            await mysql(`INSERT INTO \`leave\` (server, channel, message, id, token, time) VALUES("${interaction.guild.id}","${interaction.channel.id}","${message}","${webhook.id}","${webhook.token}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),channel = VALUES (channel),message = VALUES (message),id = VALUES (id),token = VALUES (token),time = VALUES (time);`);
            await interaction.reply({
              embeds:[{
                author:{
                  name: "退出メッセージを設定しました",
                  icon_url: "https://cdn.taka.ml/images/system/success.png"
                },
                color: "GREEN",
                description: `送信メッセージ: ${message}`
              }]
            });
          })
          .catch(async(error)=>{
            await interaction.reply({
              embeds:[{
                author:{
                  name: "退出メッセージを設定できませんでした",
                  icon_url: "https://cdn.taka.ml/images/system/error.png"
                },
                color: "RED",
                description: "BOTの権限が不足しているか,\n既にwebhookの作成回数が上限に達しています",
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
          })
      }
    }else if(interaction.options.getSubcommand() === "ignore"){//ignore
    
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
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
              value: "```管理者```"
            }
          ]
        }],
        ephemeral: true
      });

      const data = await mysql(`SELECT * FROM \`ignore\` WHERE id = ${interaction.guild.id} LIMIT 1;`);
      if(!data[0]){
        await mysql(`INSERT INTO \`ignore\` (id, time) VALUES("${interaction.guild.id}",NOW()) ON DUPLICATE KEY UPDATE id = VALUES (id),time = VALUES (time);`);
        await mysql(`DELETE FROM bump WHERE server = ${interaction.guild.id};`);
        await mysql(`DELETE FROM dissoku WHERE server = ${interaction.guild.id};`);

        await interaction.reply({
          embeds:[{
            author:{
              name: "有効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }else{
        await mysql(`DELETE FROM \`ignore\` WHERE id = ${interaction.guild.id};`);

        await interaction.reply({
          embeds:[{
            author:{
              name: "無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            color: "GREEN"
          }]
        });
      }
    }else if(interaction.options.getSubcommand() === "delete"){//delete

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
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
              value: "```管理者```"
            }
          ]
        }],
        ephemeral: true
      });

      await mysql(`DELETE FROM moderate WHERE id = ${interaction.guild.id};`);
      await mysql(`DELETE FROM pin WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM bump WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM dissoku WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM hiroyuki WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM global WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM \`ignore\` WHERE id = ${interaction.guild.id};`);
      await mysql(`DELETE FROM \`join\` WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM \`leave\` WHERE server = ${interaction.guild.id};`);

      await interaction.reply({
        content: `<@${interaction.user.id}>`,
        embeds:[{
          author:{
            name: "全てのデータを削除しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN"
        }]
      });
    }
  }
}