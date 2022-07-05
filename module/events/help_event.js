async function help_event(interaction){
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("next")){
    interaction.editReply("テスト")
    return;
  }
}
    
module.exports = help_event