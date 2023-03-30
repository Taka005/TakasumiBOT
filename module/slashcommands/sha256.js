module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  const crypto = require("crypto");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "sha256"){
    const text = interaction.options.getString("text");

    try{
      const hash = crypto.createHash("sha256");
      hash.update(text);

      await interaction.reply({
        embeds:[{
          author:{
            name: "ハッシュを生成しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
        description: `${hash.digest("hex")}`,
          color: "GREEN"
        }]
      });
    }catch(error){
      await interaction.reply({
        embeds:[{
          author:{
            name: "ハッシュを生成できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          fields:[
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],     
        components:[
          new MessageActionRow()
            .addComponents( 
              new MessageButton()
                .setLabel("サポートサーバー")
                .setURL("https://discord.gg/NEesRdGQwD")
                .setStyle("LINK"))
        ]
      });
    }
  }
}