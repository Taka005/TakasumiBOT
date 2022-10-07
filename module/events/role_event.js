async function role_event(interaction){
  if(!interaction.isSelectMenu()) return;
  if(interaction.customId === "role"){
    
    try{
      const add = await interaction.values.filter((role)=>!interaction.member.roles.cache.has(role))
      const remove = await interaction.values.filter((role)=>!add.includes(role));

      add.forEach(async(role)=>{
        await interaction.member.roles.add(role)
      });

      remove.forEach(async(role)=>{
        await interaction.member.roles.remove(role)
      });

      interaction.reply({
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
      interaction.reply({
        embeds:[{
          author: {
            name: "ロールの付与に失敗しました",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "BOTの権限が不足しているか、付与するロールがBOTより上の可能性があります\n[サポートサーバー](https://discord.gg/GPs3npB63m)"
        }],
        ephemeral:true
      })
    }
  }
    
}

module.exports = role_event