module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  const { MessageAttachment } = require("discord.js");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "Make it a Quote"){
    const message = interaction.options.getMessage("message");
    
    await interaction.deferReply();
    await interaction.editReply("生成中...");

    const image = await fetch(`http://192.168.0.13:3000/?name=${message.author.username}&tag=${message.author.discriminator}&id=${message.author.id}&content=${message.content}&icon=${message.author.avatarURL({format:"png",size:1024})}`)
      .then(res=>res.blob())
      .catch(()=>{});
    
    await interaction.editReply({ 
      content: `[生成元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
      files: [
        new MessageAttachment(image.stream(),"Takasumi_Quote.png")
      ]
    }); 
  }
}