module.exports = async(interaction,client)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "avatar"){
    const id = interaction.options.getString("id");

    if(!id){
      return await interaction.reply({
        embeds:[{
          color: "GREEN",
          author:{
            name: `${interaction.member.user.tag}のアバター`,
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          thumbnail:{
            url: interaction.member.avatarURL({format:"png",dynamic:true,size:1024})
          },
          image:{
            url: interaction.member.user.avatarURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date(),
          footer:{
            text: "TakasumiBOT"
          }
        }]
      }).catch(async(error)=>{
        await interaction.reply({
          embeds:[{
            author:{
              name: "正常に送信できませんでした",
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
        })
      });
    }
  
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

    try{
      const member = await interaction.guild.members.cache.get(userID[0]);
      const user = await client.users.fetch(userID[0]);
      
      await interaction.reply({
        embeds:[{
          color: "GREEN",
          author:{
            name: `${user.tag}のアバター`,
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          thumbnail:{
            url: member.avatarURL({format:"png",dynamic:true,size:1024})
          },
          image:{
            url: user.avatarURL({format:"png",dynamic:true,size:1024})||"https://cdn.discordapp.com/embed/avatars/0.png"
          },
          timestamp: new Date(),
          footer:{
            text: "TakasumiBOT"
          }
        }]
      });
    }catch{
      await interaction.reply({
        embeds:[{
          author:{
            name: "取得に失敗しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "指定されたユーザーは存在しないか、間違っています"
        }],
        ephemeral: true
      });
    }
  }
}