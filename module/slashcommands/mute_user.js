async function mute_user(interaction){
  const config = require("../../config.json");
  const block_user = require("../../data/block_user.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "mute_user"){
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
  }
}
  
module.exports = mute_user