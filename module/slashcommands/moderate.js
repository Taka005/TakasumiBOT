module.exports = async(interaction)=>{
  const mysql = require("../lib/mysql");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "moderate"){
    const type = interaction.options.getString("type");

    const level = {
      high:"高い",
      normal:"標準",
      low:"低い"
    };

    if(!interaction.member.permissions.has("MANAGE_GUILD")) return await interaction.reply({
      embeds:[{
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドを実行するには以下の権限を持っている必要があります\n```サーバーの管理```"
      }],
      ephemeral: true
    });

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_MESSAGES")
    ) return await interaction.reply({
      embeds:[{
        author:{
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "この機能はBOTに以下の権限が必要です\n```メッセージの管理\nチャンネルの閲覧\nメッセージの送信```"
      }],
      ephemeral: true
    });

    if(type === "off"){
      const data = await mysql(`SELECT * FROM moderate WHERE id = ${interaction.guild.id} LIMIT 1;`);
      if(!data[0]) return await interaction.reply({
        embeds:[{
          author:{
            name: "自動モデレートを無効にできませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "自動モデレートが設定されていません"
        }],
        ephemeral: true
      });
      
      await mysql(`DELETE FROM moderate WHERE id = ${interaction.guild.id} LIMIT 1;`);
      return await interaction.reply({
        embeds:[{
          author:{
            name: "自動モデレート機能を無効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN"
        }]
      });
    }

    await mysql(`INSERT INTO moderate (id, type, time) VALUES("${interaction.guild.id}","${type}",NOW()) ON DUPLICATE KEY UPDATE id = VALUES (id),type = VALUES (type),time = VALUES (time);`);
    await interaction.reply({
      embeds:[{
        author:{
          name: "自動モデレート機能を有効にしました",
          icon_url: "https://cdn.taka.ml/images/system/success.png"
        },
        color: "GREEN",
        description: `${level[type]}に設定しました`
      }]
    });
  }
}