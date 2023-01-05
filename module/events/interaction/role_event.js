module.exports = async(interaction)=>{
  if(!interaction.isSelectMenu()) return;
  if(interaction.customId === "role"){
    
    try{
      const add = interaction.values.filter((role)=>!interaction.member.roles.cache.has(role))
      const remove = interaction.values.filter((role)=>!add.includes(role));

      add.forEach(role =>{
        interaction.member.roles.add(role)
          .catch(error=>{})
      });

      remove.forEach(role =>{
        interaction.member.roles.remove(role)
          .catch(error=>{})
      });

      await interaction.reply({
        embeds:[{
          author: {
            name: "ロールを変更しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          description: `**付与したロール**\n${add.map(role=>`<@&${role}>`).join("\n")||"なし"}\n**削除したロール**\n${remove.map(role=>`<@&${role}>`).join("\n")||"なし"}`,
          color: "GREEN"
        }],
        ephemeral: true
      });
    }catch(error){
      await interaction.reply({
        embeds:[{
          author: {
            name: "ロールの付与に失敗しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "BOTの権限が不足しているか、付与するロールがBOTより上の可能性があります",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],
        ephemeral:true
      })
    }
  }
    
}