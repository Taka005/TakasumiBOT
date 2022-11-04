module.exports = async(interaction)=>{
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId === "ticket"){
    const user = interaction.user.id
    if(interaction.guild.channels.cache.find(name => name.name === user)) return await interaction.reply({
      embeds:[{
        author: {
          name: "作成できませんでした",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "既にチケットが発行済みです"
      }],
      ephemeral:true
    });

    const ch = interaction.guild.channels.cache.find(name => name.name === "ticket")
    if(!ch) return await interaction.reply({
      embeds:[{
        author: {
          name: "作成できませんでした",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "ticketカテゴリーが存在していないため、作成できません"
      }],
      ephemeral:true
    });

    await interaction.guild.channels.create(user,{
      permissionOverwrites: [{
        id: interaction.guild.roles.everyone,
        deny: ["VIEW_CHANNEL"]
      }],
      parent: ch.id
    })
      .then(async(channels) =>{
        channels.permissionOverwrites.edit(interaction.user.id, {VIEW_CHANNEL: true});

        const ticket_button = new MessageButton()
          .setCustomId("close")
          .setStyle("PRIMARY")
          .setLabel("閉じる");

        channels.send({
          embeds: [{
            color:"GREEN",
            description: "お問い合わせへようこそ！\nお問い合わせ内容などをご記入ください。\n\n※ 注意 不必要なチケットの作成はおやめ下さい"
          }],
          components: [
            new MessageActionRow()
              .addComponents(ticket_button)
          ]
        });

        await interaction.reply({
          embeds:[{
            author: {
              name: `チケットを生成しました`,
              icon_url: "https://cdn.taka.ml/images/success.png",
            },
            description:`${channels}を作成しました`,
            color: "GREEN"
          }],
          ephemeral: true
        });
      })
      .catch(async(error)=>{
        await interaction.reply({ 
          embeds:[{
            author: {
              name: "チケットを作成できませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "BOTの権限等を確認し、もう一度実行してください",
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }], 
          ephemeral: true 
        });
      })
  }else if(interaction.customId === "close"){
    await interaction.channel.delete()
      .catch(async(error)=>{
        await interaction.reply({ 
          embeds:[{
            author: {
              name: "チケットを削除できませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "BOTの権限等を確認し、もう一度実行してください",
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }], 
          ephemeral: true 
        })
      })
  }
}