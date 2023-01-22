module.exports = async(interaction)=>{
  const permission = require("../lib/permission");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "role"){
    const role = interaction.options.getRole("name");

    let permissions;
    if(permission(role.permissions).length > 0){
      permissions = permission(role.permissions);
    }else{
      permissions = ["なし"];
    }

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name: `${role.name}の情報`,
          icon_url: "https://cdn.taka.ml/images/system/success.png",
        },
        timestamp: new Date(),
        footer: {
          text: "TakasumiBOT"
        },
        fields: [
          {
            name: "ID",
            value: `${role.id}`,
            inline: true
          },
          {
            name: "メンション",
            value: role.mentionable ? "可能" : "不可能",
            inline: true
          },
          {
            name: "表示形式",
            value: role.hoist ? "別々" : "混合",
            inline: true
          },
          {
            name: "色",
            value: role.hexColor,
            inline: true
          },
          {
            name: "作成日時",
            value: `${new Date(role.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - role.createdAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name: "メンバー数",
            value: `${role.members.size}人`,
            inline: true
          },
          {
            name: "権限",
            value: `\`${permissions.join("`,`")}\``
          }
        ]
      }]
    }).catch(async(error)=>{
      await interaction.reply({
        embeds:[{
          author: {
            name: "エラーが発生しました",
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