module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  const boost = require("../lib/boost");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "server"){

    await interaction.reply({
      embeds:[{
        color: "GREEN",
        author: {
          name: `${interaction.guild.name}の情報`,
          icon_url: "https://cdn.taka.ml/images/system/success.png",
        },
        timestamp: new Date(),
        footer: {
          text: "TakasumiBOT"
        },
        thumbnail: {
          url: interaction.guild.iconURL()
        },
        fields: [
          {
            name: "ID",
            value: interaction.guild.id
          },
          {
            name: "所有者",
            value: `<@${interaction.guild.ownerId}>`
          },
          {
            name: "人数",
            value: `${interaction.guild.memberCount}人(ユーザー:${(await interaction.guild.members.fetch()).filter(m=>!m.user.bot).size}人 BOT:${(await interaction.guild.members.fetch()).filter(m=>m.user.bot).size}人)`
          },
          {
            name: "作成日時",
            value: `${new Date(interaction.guild.createdTimestamp).toLocaleString()}\n(${Math.round((Date.now() - interaction.guild.createdAt) / 86400000)}日前)`
          },
          {
            name: "統計情報",
            value: `チャンネル:${(await interaction.guild.channels.fetch()).size}個\nロール:${(await interaction.guild.roles.fetch()).size}個\n絵文字:${(await interaction.guild.emojis.fetch()).size}個\nステッカー:${(await interaction.guild.stickers.fetch()).size}個\nNitro:${interaction.guild.premiumSubscriptionCount}ブースト(${boost(interaction.guild.premiumSubscriptionCount)}レベル)`
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
        components: [
          new MessageActionRow()
            .addComponents( 
              new MessageButton()
                .setLabel("サポートサーバー")
                .setURL("https://discord.gg/NEesRdGQwD")
                .setStyle("LINK"))
        ],
        ephemeral:true
      })
    });
  }
}