async function say(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "say"){
    const text = await interaction.options.getString("text");
    interaction.channel.send(`${text.replace("@","＠")}`)
    interaction.deferReply()
      .then(()=>interaction.deleteReply());
    return;
  }
};

module.exports = say