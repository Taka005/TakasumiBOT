async function avatar(interaction,client){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "avatar"){
    const user_id = await interaction.options.getString("id");

    if(!user_id){
      await interaction.reply(interaction.member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png")
        .catch((error)=>interaction.reply({
          embeds:[{
            author: {
              name: "正常に送信できませんでした",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: `\`\`\`${error}\`\`\`\n[サポートサーバー](https://discord.gg/GPs3npB63m)`
          }],
          ephemeral:true
        }));
      return;
    }
  
    const id = user_id.match(/\d{18,19}/g);
    if(!id) return await interaction.reply({
      embeds:[{
        author: {
          name: "取得に失敗しました",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "正確にIDまたは、メンションをしてください"
      }],
      ephemeral:true
    });

    try{
      const users = await client.users.fetch(id[0]);
      await interaction.reply(users.avatarURL({ format: "png", dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png")
    }catch{
      return await interaction.reply({
        embeds:[{
          author: {
            name: "取得に失敗しました",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "指定されたユーザーは存在しないか、\n間違っています"
        }],
        ephemeral:true
      });
    }
  }
}
    
module.exports = avatar