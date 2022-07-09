async function dm(interaction,client){
  const config = require("../../config.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "dm"){
    const user = await interaction.options.getString("id");
    const text = await interaction.options.getString("text");
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

    client.users.cache.get(`${id}`).send(`${text}`)
      .then(()=>interaction.reply({
        embeds:[{
          author: {
            name: `${id}にDMを送信しました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN",
          description: `内容:${text}`
        }],
        ephemeral:true
      }))
      .catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "送信に失敗しました",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "ユーザーがDMを有効にしていません"
        }],
        ephemeral:true
      }))
  }
}
  
module.exports = dm