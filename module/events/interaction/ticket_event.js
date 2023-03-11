module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId === "ticket"){

    if(interaction.guild.channels.cache.find(name => name.name === interaction.user.id)) return await interaction.reply({
      embeds:[{
        author:{
          name: "作成できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "既にチケットが発行済みです"
      }],
      ephemeral: true
    });

    const channel = interaction.guild.channels.cache.find(name => name.name === "ticket")
    if(!channel) return await interaction.reply({
      embeds:[{
        author:{
          name: "作成できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "ticketカテゴリーが存在していないため、作成できません"
      }],
      ephemeral: true
    });

    await interaction.guild.channels.create(interaction.user.id,{
      permissionOverwrites:[{
        id: interaction.guild.roles.everyone,
        deny: ["VIEW_CHANNEL"]
      }],
      parent: channel.id
    })
      .then(async(channels)=>{
        await channels.permissionOverwrites.edit(interaction.user.id,{VIEW_CHANNEL: true});
        await channels.send({
          embeds:[{
            color: "GREEN",
            title: "チケットへようこそ"
          }],
          components:[
            new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId("close")
                  .setStyle("PRIMARY")
                  .setLabel("閉じる"))
          ]
        });

        await interaction.reply({
          embeds:[{
            author:{
              name: `チケットを生成しました`,
              icon_url: "https://cdn.taka.ml/images/system/success.png"
            },
            description: `${channels}を作成しました`,
            color: "GREEN"
          }],
          ephemeral: true
        });
      })
      .catch(async(error)=>{
        await interaction.reply({ 
          embeds:[{
            author:{
              name: "チケットを作成できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }], 
          components:[
            new MessageActionRow()
              .addComponents( 
                new MessageButton()
                  .setLabel("サポートサーバー")
                  .setURL("https://discord.gg/NEesRdGQwD")
                  .setStyle("LINK"))
          ],
          ephemeral: true 
        });
      })
  }else if(interaction.customId === "close"){
    await interaction.channel.delete()
      .catch(async(error)=>{
        await interaction.reply({ 
          embeds:[{
            author:{
              name: "チケットを削除できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }], 
          components:[
            new MessageActionRow()
              .addComponents( 
                new MessageButton()
                  .setLabel("サポートサーバー")
                  .setURL("https://discord.gg/NEesRdGQwD")
                  .setStyle("LINK"))
          ],
          ephemeral: true 
        });
      })
  }
}