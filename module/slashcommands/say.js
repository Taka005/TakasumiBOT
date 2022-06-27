async function say(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "say"){
    const text = interaction.options.getString("text");
    interaction.channel.send(`${text.replace("@","＠")}`)
    return;
  }
};

module.exports = say