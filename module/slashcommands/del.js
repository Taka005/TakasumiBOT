module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "del"){
    const number = interaction.options.getInteger("number");
    const user = interaction.options.getUser("user");

    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return await interaction.reply({
      embeds:[{
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`メッセージを管理`の権限を持っている必要があります"
      }],
      ephemeral: true
    });

    if(!interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_MESSAGES")) return await interaction.reply({
      embeds:[{
        author:{
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```メッセージの管理```"
      }],
      ephemeral: true
    });

    if(number < 2||number > 99) return await interaction.reply({
      embeds:[{
        author:{
          name: "引数が無効です",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "削除するメッセージの数は`2`以上`99`以下にする必要があります"
      }],
      ephemeral: true
    });
    
    try{
      if(user){
        const messages = await interaction.channel.messages.fetch({ limit: number });
        const msg = await messages.filter(msg => user.id === msg.author.id);
        if(!msg) return await interaction.reply({
          embeds:[{
            author:{
              name: "削除できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "メッセージに指定したユーザーが含まれていませんでした",
          }],
          ephemeral: true
        });

        await interaction.channel.bulkDelete(msg)
          .then(async()=>{
            await interaction.reply({
              content: `<@${interaction.member.user.id}>`,
              embeds:[{
                author:{
                  name: `${user.tag} のメッセージを${number}個削除しました`,
                  icon_url: "https://cdn.taka.ml/images/system/success.png"
                },
                color: "GREEN"
              }]
            })
          });
      }else{
        const messages = await interaction.channel.messages.fetch({ limit: number })         
        await interaction.channel.bulkDelete(messages)
          .then(async()=>{
            await interaction.reply({
              content: `<@${interaction.member.user.id}>`,
              embeds:[{
                author:{
                  name: `${number}個のメッセージを削除しました`,
                  icon_url: "https://cdn.taka.ml/images/system/success.png"
                },
                color: "GREEN"
              }]
            })
          });
      }
    }catch(error){
      await interaction.reply({
        embeds:[{
          author:{
            name: "削除できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: `二週間より前のメッセージが含まれていたか、\nBOTの権限が不足しています`,
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
    }
  }
}