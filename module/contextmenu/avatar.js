module.exports = async(interaction)=>{
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "アバターを表示"){
    const member = interaction.options.getMember("user");

    if(!member) return await interaction.reply({
      embeds:[{
        author: {
          name: "メンバーを取得できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description:"指定したユーザーが存在していないか、サーバーから退出しています"
      }],
      ephemeral:true
    });

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name:`${member.user.tag}のアバター`,
          icon_url: "https://cdn.taka.ml/images/system/success.png"
        },
        thumbnail: {
          url: member.avatarURL({format:"png",dynamic:true,size:1024})
        },
        image: {
          url: member.user.avatarURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
        },
        timestamp: new Date(),
        footer: {
          text: "TakasumiBOT"
        }
      }]
    })
    .catch((error)=>{
      interaction.reply({
        embeds:[{
          author: {
            name: "正常に送信できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],
        ephemeral:true
      })
    });
  }
}