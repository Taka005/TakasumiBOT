module.exports = async(interaction)=>{
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
              value: "退出メッセージの設定をします\n利用可能な変数は`/setting join`と同じです"
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
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
      ) return await interaction.reply({
        embeds:[{
          author:{
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```"
        }],
        ephemeral: true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM bump WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
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
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
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
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
      ) return await interaction.reply({
        embeds:[{
          author:{
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```"
        }],
        ephemeral: true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM dissoku WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "通知ロールを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
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
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN",
            description: `Dissoku通知に<@&${role.id}>に設定しました`
          }]
        });
      }
    }else if(interaction.options.getSubcommand() === "join"){//join
      const channel = interaction.options.getChannel("channel");
      const message = interaction.options.getString("message");

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
        embeds:[{
          author:{
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
      ) return await interaction.reply({
        embeds:[{
          author:{
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```"
        }],
        ephemeral: true
      });

      if(!channel||!message){
        const data = await mysql(`SELECT * FROM \`join\` WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN"
          }]
        });
      }else{
        if(interaction.guild.memberCount > 100) return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "この機能は試験的なため人数が100人以上のサーバーでは設定できません"
          }],
          ephemeral: true
        });

        if(message.length > 100) return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "メッセージは100文字以内にしてください"
          }],
          ephemeral: true
        });

        if(channel.type !== "GUILD_TEXT") return await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "メッセージを送信するチャンネルはテキストチャンネルにしてください"
          }],
          ephemeral: true
        });

        await mysql(`INSERT INTO \`join\` (server, channel, message, time) VALUES("${interaction.guild.id}","${channel.id}","${message}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),channel = VALUES (channel),message = VALUES (message),time = VALUES (time);`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "参加メッセージを設定しました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN",
            description: `送信チャンネル: <#${channel.id}>\n送信メッセージ: ${message}`
          }]
        });
      }
    }else if(interaction.options.getSubcommand() === "leave"){//leave
      const channel = interaction.options.getChannel("channel");
      const message = interaction.options.getString("message");

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
        embeds:[{
          author:{
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
        }],
        ephemeral: true
      });

      if(
        !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
      ) return await interaction.reply({
        embeds:[{
          author:{
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```"
        }],
        ephemeral: true
      });

      if(!channel||!message){
        const data = await mysql(`SELECT * FROM \`leave\` WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN"
          }]
        });
      }else{
        if(interaction.guild.memberCount > 100) return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "この機能は試験的なため人数が100人以上のサーバーでは設定できません"
          }],
          ephemeral: true
        });

        if(message.length > 100) return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "メッセージは100文字以内にしてください"
          }],
          ephemeral: true
        });

        if(!channel.type === "GUILD_TEXT") return await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを設定できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "メッセージを送信するチャンネルはテキストチャンネルにしてください"
          }],
          ephemeral: true
        });

        await mysql(`INSERT INTO \`leave\` (server, channel, message, time) VALUES("${interaction.guild.id}","${channel.id}","${message}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),channel = VALUES (channel),message = VALUES (message),time = VALUES (time);`);
        await interaction.reply({
          embeds:[{
            author:{
              name: "退出メッセージを設定しました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN",
            description: `送信チャンネル: <#${channel.id}>\n送信メッセージ: ${message}`
          }]
        });
      }
    }else if(interaction.options.getSubcommand() === "ignore"){//ignore
    
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
        embeds:[{
          author:{
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
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
              icon_url: "https://cdn.taka.ml/images/system/success.png",
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
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
        }],
        ephemeral: true
      });

      await mysql(`DELETE FROM moderate WHERE id = ${interaction.guild.id};`);
      await mysql(`DELETE FROM pin WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM bump WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM dissoku WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM \`ignore\` WHERE id = ${interaction.guild.id};`);
      await mysql(`DELETE FROM \`join\` WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM \`leave\` WHERE server = ${interaction.guild.id};`);

      await interaction.reply({
        content: `<@${interaction.member.user.id}>`,
        embeds:[{
          author:{
            name: "全てのデータを削除しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN"
        }]
      });
    }
  }
}