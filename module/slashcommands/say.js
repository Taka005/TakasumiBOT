async function say(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "say"){
    const text = await interaction.options.getString("text");

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

    interaction.channel.send(`${text}`)
      .catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "権限が不足しています",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: `BOTの権限をを変更し、もう一度実行してください`
        }],
        ephemeral:true
      }));

    interaction.deferUpdate({});
    return;
  }
};

module.exports = say