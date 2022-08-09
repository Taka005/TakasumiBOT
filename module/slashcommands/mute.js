async function mute(interaction,client){
  const config = require("../../config.json");
  const block_user = require("../../data/block_user.json");
  const block_server = require("../../data/block_server.json");
  const fs = require("fs");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "mute"){
    const user = await interaction.options.getString("id");
    const reason = await interaction.options.getString("reason") || "なし"
    if(interaction.member.user.id !== config.admin) return interaction.reply({
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
      let users
      try{
        users = await client.users.fetch(id[0]);
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

      if(block_user[id[0]]){//登録済み
        delete block_user[id[0]];
        fs.writeFileSync("./data/block_user.json", JSON.stringify(block_user), "utf8");
        delete require.cache[require.resolve("../../data/block_user.json")];

        return interaction.reply({
          embeds:[{
            author: {
              name: `${users.tag} をミュートしました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }],
          ephemeral:true
        });
      }
    
      //登録なし
      block_user[id[0]] = reason;
      fs.writeFileSync("./data/block_user.json", JSON.stringify(block_user), "utf8");
      delete require.cache[require.resolve("../../data/block_user.json")];

      return interaction.reply({
        embeds:[{
          author: {
            name: `${users.tag} のミュートを解除しました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      });
    }else if(interaction.options.getSubcommand() === "server"){
      const guild = client.guilds.cache.get(id[0]);
      if(!guild) return await interaction.reply({
        embeds:[{
          author: {
            name: "サーバーをミュートできませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "指定したサーバーが存在しません"
        }],
        ephemeral:true
      });

      if(block_server[id[0]]){//登録済み
        delete block_server[id[0]];
        fs.writeFileSync("./data/block_server.json", JSON.stringify(block_server), "utf8");
        delete require.cache[require.resolve("../../data/block_server.json")];

        return interaction.reply({
          embeds:[{
            author: {
              name: `${guild.name} のミュートを解除しました`,
              icon_url: "https://taka.ml/images/success.png",
            },
            color: "GREEN"
          }],
          ephemeral:true
        });
      }

      //登録なし
      block_server[id[0]] = reason;
      fs.writeFileSync("./data/block_server.json", JSON.stringify(block_server), "utf8");
      delete require.cache[require.resolve("../../data/block_server.json")];

      return interaction.reply({
        embeds:[{
          author: {
            name: `${guild.name} をミュートしました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }],
        ephemeral:true
      });
    }
  }
}
  
module.exports = mute