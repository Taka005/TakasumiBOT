async function qrgen(interaction){
  const { MessageAttachment } = require("discord.js")
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "qrgen"){
    const text = await interaction.options.getString("text");
  
    const qr_response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(text)}&size=256x256&format=png`)
      .then(res =>res.arrayBuffer()) 
      .catch(()=>{})

    await interaction.reply({files:[new MessageAttachment(qr_response.toBuffer(), `QR ${text}`)]});
      return;
  }
}
  
  module.exports = qrgen