module.exports = async(interaction)=>{
  const permission = require("../lib/permission");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "権限を表示"){
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

    try{
      let permissions;
      if(permission(member.permissions).length > 0){
        permissions = permission(member.permissions);
      }else{
        permissions = ["なし"];
      }
      
      await interaction.reply({
        embeds:[{
          color: "GREEN",
          author: {
            name:`${member.user.tag}の権限`,
            url: `https://discord.com/users/${member.user.id}`,
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          timestamp: new Date(),
          footer: {
            text: "TakasumiBOT"
          },
          description:`\`${permissions.join("`,`")}\``
        }]
      })
    }catch(error){
      await interaction.reply({
        embeds:[{
          author: {
            name: "権限を表示できませんでした",
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
      });
    }
  }
}