module.exports = async(interaction)=>{
  const async = require("async");
  if(!interaction.isSelectMenu()) return;
  if(interaction.customId === "role"){
    
    try{
      const add = await interaction.values.filter((role)=>!interaction.member.roles.cache.has(role))
      const remove = await interaction.values.filter((role)=>!add.includes(role));

      await async.each(add,async(role)=>{
        await interaction.member.roles.add(role)
      })

      await async.each(remove,async(role)=>{
        await interaction.member.roles.remove(role)
      })

      await interaction.reply({
        embeds:[{
          author: {
            name: "ロールを変更しました",
            icon_url: "https://cdn.taka.ml/images/success.png",
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
            icon_url: "https://cdn.taka.ml/images/error.png",
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