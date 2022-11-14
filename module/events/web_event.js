module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("web_")){
    const role = interaction.customId.split("_");

    if(interaction.member.roles.cache.has(role[1])) return await interaction.reply({
      embeds:[{
        author: {
          name: "既に認証済みです",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
      }],
      ephemeral:true
    });

    const user = await fetch("https://auth.taka.ml/data/user.json")
      .then(res=>res.json())
      .catch(()=>{})

    const site = new MessageButton()
      .setLabel("サイトへ飛ぶ")
      .setURL("https://auth.taka.ml/")
      .setStyle("LINK")

    if(!user[interaction.member.user.id]) return await interaction.reply({
      embeds:[{
        author: {
          name: "認証に失敗しました",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "TakasumiBOT Membersに登録されていないため、認証できません\n以下のリンクから登録してください"
      }],
      components: [
        new MessageActionRow()
          .addComponents(site)
      ],
      ephemeral:true
    });

    if(user[interaction.member.user.id].name !== interaction.member.user.username) return await interaction.reply({
      embeds:[{
        author: {
          name: "認証に失敗しました",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "TakasumiBOT Membersに登録されていますが登録時の名前と違うため、認証できません\n以下のリンクから更新してください"
      }],
      components: [
        new MessageActionRow()
          .addComponents(site)
      ],
      ephemeral:true
    });

    await interaction.member.roles.add(role[1])
      .then(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "認証しました",
              icon_url: "https://cdn.taka.ml/images/system/success.png",
            },
            color: "GREEN"
          }],
          ephemeral: true
        });
      })
      .catch((error)=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "認証に失敗しました",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
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
      })
  }
}