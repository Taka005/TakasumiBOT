async function say(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "say"){
    const text = await interaction.options.getString("text");

    interaction.channel.send(`${text.replace("@","＠")}`)
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

    interaction.deferReply()
      .then(()=>interaction.deleteReply());
    return;
  }
};

module.exports = say