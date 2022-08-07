async function point(interaction,client){
  const config = require("../../config.json");
  const point_user = require("../../data/point.json");
  const fs = require("fs");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "point"){
    const user = await interaction.options.getString("id");
    const points = await interaction.options.getString("points");
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
    
    const users = await client.users.fetch(id[0])
      .catch(()=>{
        interaction.reply({
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
      })
    point_user[id] = points;
    fs.writeFileSync("./data/point_user.json", JSON.stringify(point_user), "utf8");
    delete require.cache[require.resolve("../../data/point_user.json")];

    return interaction.reply({
      embeds:[{
        author: {
          name: `${users.tag}の評価を${points}にしました`,
          icon_url: "https://taka.ml/images/success.png",
        },
        color: "GREEN"
      }],
      ephemeral:true
    });
  }
}
  
module.exports = point