async function mute(interaction){
  const config = require("../../config.json");
  const block_user = require("../../data/block_user.json");
  const block_server = require("../../data/block_server.json");
  const fs = require("fs");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "mute"){
    const user = await interaction.options.getString("id");
    const reason = await interaction.options.getString("reason");
    if(!interaction.member.user.id == config.admin) return interaction.reply({
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

    const id = user.match(/\d{18}/g);
    if(!id) return interaction.reply({
      embeds:[{
        author: {
          name: "引数が無効です",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "ユーザーIDを指定する必要があります"
      }],
      ephemeral:true
    });

    if(interaction.options.getSubcommand() === "user"){
      if(block_user[id]){//登録済み
        delete block_user[id];
        fs.writeFileSync("./data/block_user.json", JSON.stringify(block_user), "utf8");
        delete require.cache[require.resolve("../../data/block_user.json")];

        return interaction.reply({
          content:`${interaction.member}`,
          embeds:[{
            author: {
              name: "ミュートユーザーを削除しました",
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        });
      }
    
      //登録なし
      block_user[id] = reason;
      fs.writeFileSync("./data/block_user.json", JSON.stringify(block_user), "utf8");
      delete require.cache[require.resolve("../../data/block_user.json")];

      return interaction.reply({
        content:`${interaction.member}`,
        embeds:[{
          author: {
            name: "ミュートユーザーを追加しました",
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      });
    }else if(interaction.options.getSubcommand() === "server"){
      if(block_server[id]){//登録済み
        delete block_server[id];
        fs.writeFileSync("./data/block_server.json", JSON.stringify(block_server), "utf8");
        delete require.cache[require.resolve("../../data/block_server.json")];

        return interaction.reply({
          content:`${interaction.member}`,
          embeds:[{
            author: {
              name: "ミュートサーバーを削除しました",
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }]
        });
      }
    
      //登録なし
      block_server[id] = reason;
      fs.writeFileSync("./data/block_server.json", JSON.stringify(block_server), "utf8");
      delete require.cache[require.resolve("../../data/block_server.json")];

      return interaction.reply({
        content:`${interaction.member}`,
        embeds:[{
          author: {
            name: "ミュートサーバーを追加しました",
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      });
    }
  }
}
  
module.exports = mute