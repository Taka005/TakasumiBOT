module.exports = async(interaction,client)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ban"){
    const id = interaction.options.getString("id");
    const reason = interaction.options.getString("reason")||`${interaction.member.user.tag}によってBAN`;
    const days = interaction.options.getInteger("days");
    
    if(!interaction.member.permissions.has("BAN_MEMBERS")) return await interaction.reply({
      embeds:[{
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドを実行するには以下の権限を持ってる必要があります\n```メンバーをBAN```"
      }],
      ephemeral: true
    });

    if(!interaction.guild.me.permissionsIn(interaction.channel).has("BAN_MEMBERS")) return await interaction.reply({
      embeds:[{
        author:{
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドはBOTに以下の権限が必要です\n```メンバーをBAN```"
      }],
      ephemeral: true
    });

    const userID = id.match(/\d{18,19}/g);
    if(!userID) return await interaction.reply({
      embeds:[{
        author:{
          name: "取得に失敗しました",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "正確にIDまたは、メンションをしてください"
      }],
      ephemeral: true
    });

    if(userID[0] === interaction.member.user.id) return await interaction.reply({
      embeds:[{
        author:{
          name: "メンバーをBANできませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "自分自身をBANすることはできません"
      }],
      ephemeral: true
    });

    let user;
    try{
      user = await client.users.fetch(userID[0]);
    }catch{
      return await interaction.reply({
        embeds:[{
          author:{
            name: "メンバーをBANできませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "指定したユーザーが存在しません"
        }],
        ephemeral: true
      });
    }
    
    if(days){
      await interaction.guild.bans.create(userID[0],{reason: reason,days: days})
        .then(async()=>{
          await interaction.reply({
            content: `<@${interaction.member.user.id}>`,
            embeds:[{
              author:{
                name: `${user.tag} をサーバーからBANしました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png"
              },
              color: "GREEN"
            }]
          });
        })
        .catch(async(error)=>{
          await interaction.reply({
            embeds:[{
              author:{
                name: "メンバーをBANできませんでした",
                icon_url: "https://cdn.taka.ml/images/system/error.png"
              },
              color: "RED",
              description: "BOTの権限が不足しているか、メンバーが正しく指定されていません",
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
          })
        })
    }else{
      await interaction.guild.bans.create(userID[0],{ reason: reason })
        .then(async()=>{
          await interaction.reply({
            content: `<@${interaction.member.user.id}>`,
            embeds:[{
              author:{
                name: `${user.tag} をサーバーからBANしました`,
                icon_url: "https://cdn.taka.ml/images/system/success.png"
              },
              color: "GREEN"
            }]
          });
        })
        .catch(async(error)=>{
          await interaction.reply({
            embeds:[{
              author:{
                name: "メンバーをBANできませんでした",
                icon_url: "https://cdn.taka.ml/images/system/error.png"
              },
              color: "RED",
              description: "BOTの権限が不足しているか、メンバーが正しく指定されていません",
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
}