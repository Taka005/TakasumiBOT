async function role(interaction){
  const {MessageActionRow, MessageSelectMenu} = require("discord.js");

  if(!interaction.isCommand()) return;
  if(interaction.commandName === "role"){
    const select_1 = await interaction.options.getRole("select_1");
    const select_2 = await interaction.options.getRole("select_2");
    const select_3 = await interaction.options.getRole("select_3");
    const select_4 = await interaction.options.getRole("select_4");
    const select_5 = await interaction.options.getRole("select_5");
    const select_6 = await interaction.options.getRole("select_6");
    const select_7 = await interaction.options.getRole("select_7");
    const select_8 = await interaction.options.getRole("select_8");
    const select_9 = await interaction.options.getRole("select_9");
    const select_10 = await interaction.options.getRole("select_10");
    const select_11 = await interaction.options.getRole("select_11");
    const select_12 = await interaction.options.getRole("select_12");

    const emojis = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱"];

    const selects = [select_1,select_2,select_3,select_4,select_5,select_6,select_7,select_8,select_9,select_10,select_11,select_12]
      .filter(select=>select!==null)

    if(!interaction.member.permissions.has("MANAGE_ROLES")) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`ロールの管理`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信```\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
      }],
      ephemeral:true
    });

    const roles = new MessageSelectMenu()
      .setCustomId("role")
      .setPlaceholder("ロールが選択されていません")
      .setMinValues(1)
      .setMaxValues(selects.length)
      .addOptions(
        selects.map((c,i) =>({
          label: `@${c.name}`,
          value: c.id,
          emoji:{
            name: emojis[i]
          }
        }))
      )

    try{
      const msg = await interaction.channel.send({
                  embeds:[{
                    title: "役職パネル",          
                    color: interaction.member.displayHexColor,
                    description: selects.map((c,i)=>`${emojis[i]}<@&${c.id}>`).join("\n")
                  }],
                  components: [     
                    new MessageActionRow()
                      .addComponents(roles)
                  ]
      })
    }catch(error){
      await msg.edit({
        embeds:[{
          author: {
            name: "作成できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "コマンドが正常に完了できませんでした",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }]
      });
    }
    interaction.deferReply()
      .then(()=>interaction.deleteReply())
  }
}
    
module.exports = role