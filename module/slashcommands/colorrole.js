async function colorrole(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "colorrole"){
    const name = await interaction.options.getString("name");
    const color = await interaction.options.getString("color");

    if(!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたが「ロールの管理」の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(!interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_ROLES")) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```ロールの管理```"
      }],
      ephemeral:true
    });

    await interaction.guild.roles.create({
      name: name,
      color: color,
      position: interaction.guild.me.roles.highest.position -1,
      mentionable: false,
      reason: "色付きロールの作成",
    })
    .then(async(role)=>{
      await interaction.reply({
        embeds:[{
          author: {
            name: "ロールを作成しました",
            icon_url: "https://cdn.taka.ml/images/success.png",
          },
          description: `作成したロール:${role}`,
          color: "GREEN"
        }]
      })
    })
    .catch(async(error)=>{
      await interaction.reply({
        embeds:[{
          author: {
            name: "ロールを作成できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
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
    })
  }
}

module.exports = colorrole