async function del(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "del"){
    const del = await interaction.options.getInteger("number");
    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`メッセージを管理`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(del < 2 || del > 80 ) return interaction.reply({
      embeds:[{
        author: {
          name: "引数が無効です",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "削除するメッセージの数は`2`以上`80`以下にする必要があります"
      }],
      ephemeral:true
    });

    const messages = await interaction.channel.messages.fetch({ limit: del })         
    interaction.channel.bulkDelete(messages)
      .then(()=>interaction.reply({
        content:`${interaction.member}`,
        embeds:[{
          author: {
            name: `${del}個のメッセージを削除しました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      }))
      .catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "削除できませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: `二週間より前のメッセージが含まれていたか、\nBOTの権限が不足しています`
        }],
        ephemeral:true
      }));
  }
}
  
module.exports = del