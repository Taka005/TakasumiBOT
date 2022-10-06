async function role_event(intaraction){
  if(intaraction.isSelectMenu()) return;
  if(interaction.customId === "role"){
    intaraction.reply(`${intaraction}`)
  }
    
}

module.exports = role_event