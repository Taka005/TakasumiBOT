module.exports = async(interaction)=>{
  const { admin } = require("../../config.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "debug"){
    const id = interaction.options.getString("id");
    const type = interaction.options.getString("type");

    if(interaction.member.user.id !== admin) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドは、関係者以外実行できません"
      }],
      ephemeral:true
    });

    if(type === "content"){
      try{
        const msg = await interaction.channel.messages.fetch(id);
        await interaction.reply({
          embeds:[{
            author: {
              name: "取得しました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN",
            description: `\`\`\`json\n${JSON.stringify(msg)}\`\`\``
          }]
        });
      }catch{
        await interaction.reply({
          embeds:[{
            author: {
              name: "取得できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "メッセージが存在しません"
          }],
          ephemeral:true
        });
      }
    }else if(type === "delete"){
      try{
        const msg = await interaction.channel.messages.fetch(id);
        msg.delete();
        await interaction.reply({
          embeds:[{
            author: {
              name: "削除しました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN",
            description: `\`\`\`json\n${JSON.stringify(msg)}\`\`\``
          }]
        });
      }catch{
        await interaction.reply({
          embeds:[{
            author: {
              name: "取得できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: "メッセージが存在しません"
          }],
          ephemeral:true
        });
      }
    } 
  }
}