async function role_event(interaction){
  if(interaction.isSelectMenu()) return;
  if(interaction.customId === "role"){

    try{
      const roles = interaction.values.map(role =>{
        if(await interaction.member.roles.cache.has(role)){
          await interaction.member.roles.remove(role)
          return [role,false]
        }else{
          await interaction.member.roles.add(role)
          return [role,true]
        }
      });

      const add = roles.map((c,i)=>{
        if(!c[1]) return
         return `<@&${c[0]}>`
      });

      const remove = roles.map((c,i)=>{
        if(!c[1]) return
         return `<@&${c[0]}>`
      });

      interaction.reply({
        embeds:[{
          author: {
            name: "ロールを付与しました",
            icon_url: "https://cdn.taka.ml/images/success.png",
          },
          description: `**付与したロール**\n${add.join("\n")}\n**削除したロール**\n${remove.join("\n")}`,
          color: "GREEN"
        }],
        ephemeral: true
      });
    }catch{
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