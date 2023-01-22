module.exports = async(interaction)=>{
  const {MessageActionRow, MessageSelectMenu} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "panel"){
    const title = interaction.options.getString("title");
    const role_1 = interaction.options.getRole("role_1");
    const role_2 = interaction.options.getRole("role_2");
    const role_3 = interaction.options.getRole("role_3");
    const role_4 = interaction.options.getRole("role_4");
    const role_5 = interaction.options.getRole("role_5");
    const role_6 = interaction.options.getRole("role_6");
    const role_7 = interaction.options.getRole("role_7");
    const role_8 = interaction.options.getRole("role_8");
    const role_9 = interaction.options.getRole("role_9");
    const role_10 = interaction.options.getRole("role_10");

    const emojis = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯"];

    const selects = [role_1,role_2,role_3,role_4,role_5,role_6,role_7,role_8,role_9,role_10]
      .filter(role=>role!==null)

    if(!interaction.member.permissions.has("MANAGE_ROLES")) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`ロールの管理`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_ROLES")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```チャンネルの閲覧\nメッセージの送信\nロールの管理```"
      }],
      ephemeral:true
    });

    const roles = new MessageSelectMenu()
      .setCustomId("role")
      .setPlaceholder("ロールが選択されていません")
      .setMinValues(0)
      .setMaxValues(selects.length)
      .addOptions(
        selects.map((c,i)=>({
          label: `@${c.name}`,
          value: c.id,
          emoji:{
            name: emojis[i]
          }
        }))
      )

    try{
      await interaction.channel.send({
        embeds:[{
          title: title,          
          color: "GREEN",
          description: selects.map((c,i)=>`${emojis[i]}<@&${c.id}>`).join("\n")
        }],
        components: [     
          new MessageActionRow()
            .addComponents(roles)
        ]
      });

      await interaction.deferReply()
        .then(()=>interaction.deleteReply())
    }catch(error){
      await interaction.reply({
        embeds:[{
          author: {
            name: "作成できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description:"同じロールが選択されているか、BOTの権限が不足しています",
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