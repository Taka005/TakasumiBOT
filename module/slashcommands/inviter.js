module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "inviter"){

    if(!interaction.guild.members.me.permissionsIn(interaction.channel).has("MANAGE_GUILD")) return await interaction.reply({
      embeds:[{
        author:{
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドはBOTに以下の権限が必要です",
        fields:[
          {
            name: "必要な権限",
            value: "```サーバーの管理```"
          }
        ]
      }],
      ephemeral: true
    });

    try{
      const invites = (await interaction.guild.invites.fetch()).toJSON()
        .filter(invite=>invite.uses!==0||invite.inviterId)
        .reduce((user,invite)=>{
          if(!user[invite.inviterId]) user[invite.inviterId] = [];
          user[invite.inviterId].push(invite);
          return user;
        },{});

      const count = Object.keys(invites)
        .map(user=>{
          let invite = invites[user][0];
          invite.uses = invites[user].reduce((total,invite)=>total + invite.uses,0);
          return invite;
        })
        .sort((a,b)=>{
          if(a.uses < b.uses){
            return 1;
          }else{
            return -1;
          }
        });

      await interaction.reply({
        embeds:[{
          author:{
            name: "招待ランキング",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN",
          description: count.map((invite,i)=>`${i+1}位 <@${invite.inviterId}>(${invite.uses}回)`).join("\n")
        }]
      });
    }catch(error){
      await interaction.reply({
        embeds:[{
          author:{
            name: "招待リンクを取得できませんでした",
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
    }
  }
}