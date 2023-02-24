module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isSelectMenu()) return;
  if(interaction.customId === "role"){
    
    await interaction.deferReply({ephemeral: true});
    try{
      const add = interaction.values.filter(role=>!interaction.member.roles.cache.has(role))
      const remove = interaction.values.filter(role=>!add.includes(role));


      let error;
      error = add.map(async(role)=>{
        try{
          await interaction.member.roles.add(role);
        }catch{
          return role;
        }
      });

      error = remove.map(async(role)=>{
        try{
          await interaction.member.roles.remove(role);
        }catch{
          return role;
        }
      });

      await interaction.editReply({
        embeds:[{
          author:{
            name: "ロールを変更しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          description: `**付与したロール**\n${add.map(role=>`<@&${role}>`).join("\n")||"なし"}\n**削除したロール**\n${remove.map(role=>`<@&${role}>`).join("\n")||"なし"}\n**付与に失敗したロール**\n${error.map(role=>`<@&${role}>`).join("\n")||"なし"}`,
          color: "GREEN"
        }],
        ephemeral: true
      });
    }catch(error){
      await interaction.editReply({
        embeds:[{
          author:{
            name: "ロールの付与に失敗しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "BOTの権限が不足しているか、付与するロールがBOTより上の可能性があります",
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
        ],
        ephemeral: true
      })
    }
  }
}