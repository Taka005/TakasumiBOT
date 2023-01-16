module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "auth"){
    const type = interaction.options.getString("type");
    const role = interaction.options.getRole("role");

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_ROLES")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```ロールの管理\nメッセージの送信\nチャンネルの閲覧```"
      }],
      ephemeral:true
    });

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
    
    if(type === "normal"){
      await interaction.channel.send({
        embeds: [{
          color:"WHITE",
          description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
        }],
        components: [
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId(`normal_${role.id}`)
                .setStyle("PRIMARY")
                .setLabel("認証"))
          ]
      })
        .then(async()=>{
          await interaction.deferReply()
            .then(()=>interaction.deleteReply())
        })
        .catch(async(error)=>{
          await interaction.reply({ 
            embeds:[{
              author: {
                name: "認証機能の作成に失敗しました",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
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

    }else if(type === "panel"){
      await interaction.channel.send({
        embeds: [{
          color:"BLUE",
            description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
          }],
          components: [
            new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId(`panel_${role.id}`)
                  .setStyle("PRIMARY")
                  .setLabel("認証")
              )
            ]
      })
        .then(async()=>{
          await interaction.deferReply()
             .then(()=>interaction.deleteReply())
        })
        .catch(async(error)=>{
          await interaction.reply({ 
            embeds:[{
              author: {
                name: "認証機能の作成に失敗しました",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
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
    }else if(type === "image"){
      await interaction.channel.send({
        embeds: [{
          color:"GREEN",
            description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
          }],
          components: [
            new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId(`image_${role.id}`)
                  .setStyle("PRIMARY")
                  .setLabel("認証")
              )
            ]
      })
        .then(async()=>{
          await interaction.deferReply()
             .then(()=>interaction.deleteReply())
        })
        .catch(async(error)=>{
          await interaction.reply({ 
            embeds:[{
              author: {
                name: "認証機能の作成に失敗しました",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
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
    }else if(type === "web"){
      await interaction.channel.send({
        embeds: [{
          color:"YELLOW",
          description: `<@&${role.id}>を貰うには、認証ボタンを押してください`
        }],
        components: [
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId(`web_${role.id}`)
                .setStyle("PRIMARY")
                .setLabel("認証")
            )
          ]
      })
        .then(async()=>{
          await interaction.deferReply()
            .then(()=>interaction.deleteReply())
        })
        .catch(async(error)=>{
          await interaction.reply({ 
            embeds:[{
              author: {
                name: "認証機能の作成に失敗しました",
                icon_url: "https://cdn.taka.ml/images/system/error.png",
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
    }
  }
}