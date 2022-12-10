module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ticket"){
    if(
      !interaction.member.permissions.has("MANAGE_MESSAGES")||
      !interaction.member.permissions.has("MANAGE_CHANNELS")
    ) return interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```メッセージを管理\nチャンネルの管理```"
      }],
      ephemeral:true
    });

    if(
      !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
      !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_CHANNELS")
    ) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "この機能は、BOTに以下の権限が必要です\n```チャンネルの閲覧\nチャンネルの管理\nメッセージの送信```"
      }],
      ephemeral:true
    });

    const ticket_button = new MessageButton()
      .setCustomId("ticket")
      .setStyle("PRIMARY")
      .setLabel("作成");

    await interaction.channel.send({
      embeds: [{
        color:"GREEN",
        title:"チケット",
        description: "チケットの発行は下のボタンを押してください"
      }],
      components: [
        new MessageActionRow()
          .addComponents(ticket_button)
      ]
      }).catch(async(error)=>{
        await interaction.reply({
          embeds:[{
            author: {
              name: "チケットが作成出来ませんでした",
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

      if(!interaction.guild.channels.cache.find(name => name.name === "ticket")){
        await interaction.guild.channels.create("ticket",{
          type: "GUILD_CATEGORY"
        });
      }

      await interaction.deferReply()
        .then(()=>interaction.deleteReply());
  }
}