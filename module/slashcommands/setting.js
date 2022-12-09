module.exports = async(interaction)=>{
  const mysql = require("../lib/mysql.js");
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

    if(interaction.options.getSubcommand() === "bump"){//BUMPロール設定
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
          description: "このコマンドを実行するには、あなたがこのサーバーの\n`チャンネルの管理`の権限を持っている必要があります"
        }],
        ephemeral:true
      });

      if(!role){
        const data = await mysql(`SELECT * FROM bump WHERE server = ${interaction.guild.id} LIMIT 1;`);
        if(!data) return await interaction.reply({
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
          }],
          ephemeral:true
        });
      }

      await mysql(`INSERT INTO bump (server, role) VALUES(${interaction.guild.id},${role.id}) ON DUPLICATE KEY UPDATE server = VALUES (server),role = VALUES (role);`);
      return await interaction.reply({
        embeds:[{
          author: {
            name: "通知ロールを有効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `Bump通知に<@&${role.id}>に設定しました`
        }],
        ephemeral:true
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
        if(!data) return await interaction.reply({
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
          }],
          ephemeral:true
        });
      }

      await mysql(`INSERT INTO dissoku (server, role) VALUES(${interaction.guild.id},${role.id}) ON DUPLICATE KEY UPDATE server = VALUES (server),role = VALUES (role);`);
      return await interaction.reply({
        embeds:[{
          author: {
            name: "通知ロールを有効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `Dissoku通知に<@&${role.id}>に設定しました`
        }],
        ephemeral:true
      });
    }
  }
}