module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  const { MessageAttachment } = require("discord.js");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "Make it a Quote"){
    const message = interaction.options.getMessage("message");
    
    if(!message.cleanContent) return await interaction.reply({
      embeds:[{
        author:{
          name: "生成できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "メッセージの内容が存在しません"
      }],
      ephemeral: true
    });

    await interaction.deferReply();
    await interaction.editReply("生成中...");

    const image = await fetch(`https://miq-api.tuna2134.jp/?name=${message.author.username}&tag=${message.author.discriminator}&id=${message.author.id}&content=${message.cleanContent}&icon=${message.author.avatarURL({format:"png",size:1024})}`)
      .then(res=>res.blob())
    
    await interaction.editReply({ 
      content: `[生成元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
      files: [
        new MessageAttachment(image.stream(),"Takasumi_Quote.png")
      ]
    }); 
  }
}