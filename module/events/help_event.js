async function help_event(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("next")){
    interaction.message.edit("テスト")
    return;
  }
}
    
module.exports = help_event