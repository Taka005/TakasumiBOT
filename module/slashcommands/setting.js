module.exports = async(interaction)=>{
  const mysql = require("../lib/mysql");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "setting"){

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```"
      }],
      ephemeral:true
    });

    if(interaction.options.getSubcommand() === "help"){//Help画面
      await interaction.reply({
        embeds:[{
          title: "HELP 設定",
          color: "GREEN",
          fields: [
            {
              name: "/setting bump",
              value: "BUMPの時間に通知するロールを設定します\n ※これを実行するには、`ロールの管理 チャンネルの管理`の権限が必要です"
            },
            {
              name: "/setting dissoku",
              value: "Dissoku UPの時間に通知するロールを設定します\n ※これを実行するには、`ロールの管理 チャンネルの管理`の権限が必要です"
            },
            {
              name: "/setting moderate",
              value: "自動モデレート機能を有効にします\n ※これを実行するには、`サーバーの管理 チャンネルの管理`の権限が必要です"
            },
            {
              name: "/setting delete",
              value: "データベースに登録されているサーバーの設定情報を全て削除します\n**この操作は元に戻せません**\n ※これを実行するには、`管理者`の権限が必要です"
            }
          ]
        }]
      });
    }else if(interaction.options.getSubcommand() === "bump"){//BUMPロール設定
      const role = interaction.options.getRole("role");
      if(
        !interaction.member.permissions.has("MANAGE_CHANNELS")||
        !interaction.member.permissions.has("MANAGE_ROLES")
      ) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```ロールの管理\nチャンネルの管理```"
        }],
        ephemeral:true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM bump WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author: {
              name: "通知ロールを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "通知ロールが設定されていません"
          }],
          ephemeral:true
        });

        await mysql(`DELETE FROM bump WHERE server = ${interaction.guild.id} LIMIT 1;`);
        return await interaction.reply({
          embeds:[{
            author: {
              name: "通知ロールを無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN"
          }]
        });
      }

      const bot = interaction.guild.members.cache.get("302050872383242240");
      if(!bot) return await interaction.reply({
        embeds:[{
          author: {
            name: "通知ロールを有効にできませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このサーバーにDisboardが参加していません\nもし参加している場合は少し時間を置いてから実行してください"
        }],
        ephemeral:true
      });

      await mysql(`INSERT INTO bump (server, role, time) VALUES("${interaction.guild.id}","${role.id}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),role = VALUES (role),time = VALUES (time);`);
      return await interaction.reply({
        embeds:[{
          author: {
            name: "通知ロールを有効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `Bump通知に<@&${role.id}>に設定しました`
        }]
      });

    }else if(interaction.options.getSubcommand() === "dissoku"){//Dissokuロール設定
      const role = interaction.options.getRole("role");

      if(
        !interaction.member.permissions.has("MANAGE_CHANNELS")||
        !interaction.member.permissions.has("MANAGE_ROLES")
      ) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```ロールの管理\nチャンネルの管理```"
        }],
        ephemeral:true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM dissoku WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author: {
              name: "通知ロールを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "通知ロールが設定されていません"
          }],
          ephemeral:true
        });

        await mysql(`DELETE FROM dissoku WHERE server = ${interaction.guild.id} LIMIT 1;`);
        return await interaction.reply({
          embeds:[{
            author: {
              name: "通知ロールを無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN"
          }]
        });
      }

      const bot = interaction.guild.members.cache.get("761562078095867916");
      if(!bot) return await interaction.reply({
        embeds:[{
          author: {
            name: "通知ロールを有効にできませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このサーバーにDissokuが参加していません\nもし参加している場合は少し時間を置いてから実行してください"
        }],
        ephemeral:true
      });


      await mysql(`INSERT INTO dissoku (server, role, time) VALUES("${interaction.guild.id}","${role.id}",NOW()) ON DUPLICATE KEY UPDATE server = VALUES (server),role = VALUES (role),time = VALUES (time);`);
      await interaction.reply({
        embeds:[{
          author: {
            name: "通知ロールを有効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `Dissoku通知に<@&${role.id}>に設定しました`
        }]
      });
    }else if(interaction.options.getSubcommand() === "moderate"){//Moderate
      const level = {
        high:"高い",
        normal:"標準",
        low:"低い"
      };
      const type = interaction.options.getString("type");

      if(
        !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_MESSAGES")
      ) return await interaction.reply({
        embeds:[{
          author: {
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "この機能は、BOTに以下の権限が必要です\n```メッセージの管理\nチャンネルの閲覧\nメッセージの送信```"
        }],
        ephemeral:true
      });

      if(
        !interaction.member.permissions.has("MANAGE_CHANNELS")||
        !interaction.member.permissions.has("MANAGE_GUILD")
      ) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```サーバーの管理\nチャンネルの管理```"
        }],
        ephemeral:true
      });

      if(type === "off"){
        const data = await mysql(`SELECT * FROM moderate WHERE id = ${interaction.guild.id} LIMIT 1;`);
        if(!data[0]) return await interaction.reply({
          embeds:[{
            author: {
              name: "自動モデレートを無効にできませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "自動モデレートが設定されていません"
          }],
          ephemeral:true
        });
        
        await mysql(`DELETE FROM moderate WHERE id = ${interaction.guild.id} LIMIT 1;`);
        return await interaction.reply({
          embeds:[{
            author: {
              name: "自動モデレート機能を無効にしました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN"
          }]
        });
      }

      await mysql(`INSERT INTO moderate (id, type, time) VALUES("${interaction.guild.id}","${type}",NOW()) ON DUPLICATE KEY UPDATE id = VALUES (id),type = VALUES (type),time = VALUES (time);`);
      await interaction.reply({
        embeds:[{
          author: {
            name: "自動モデレート機能を有効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `${level[type]}に設定しました`
        }]
      });
    }else if(interaction.options.getSubcommand() === "delete"){//delete

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```管理者```"
        }],
        ephemeral:true
      });

      await mysql(`DELETE FROM moderate WHERE id = ${interaction.guild.id};`);
      await mysql(`DELETE FROM pin WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM bump WHERE server = ${interaction.guild.id};`);
      await mysql(`DELETE FROM dissoku WHERE server = ${interaction.guild.id};`);

      await interaction.reply({
        content: `<@${interaction.member.user.id}>`,
        embeds:[{
          author: {
            name: "全てのデータを削除しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN"
        }]
      });
    }
  }
}