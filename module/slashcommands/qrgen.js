async function qrgen(interaction){
  const { MessageAttachment } = require("discord.js")
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "qrgen"){
    const text = await interaction.options.getString("text");
  
    const qr_response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(text)}&size=256x256&format=png`)
      .then(res =>res.arrayBuffer()) 
      .catch(()=>{})
    const attachment = new MessageAttachment(Buffer.from(qr_response), `QR:${text}`);

    await interaction.reply({files:[attachment]});
      return;
  }
}
  
  module.exports = qrgen