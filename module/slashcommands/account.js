module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  const mysql = require("../lib/mysql");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "account"){
    const account = await mysql(`SELECT * FROM account WHERE id = ${interaction.member.user.id} LIMIT 1;`);

    if(!account[0]){
      await interaction.reply({ 
        embeds:[{
          author:{
            name: "登録されていません",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "以下のリンクから登録を行うことができます\n登録が完了すると[グローバルチャット利用規約](https://gc.taka.ml/)にも同意したものとみなします",
        }], 
        components:[
          new MessageActionRow()
            .addComponents( 
              new MessageButton()
                .setLabel("サイトへ飛ぶ")
                .setURL("https://auth.taka.ml/")
                .setStyle("LINK"))
        ],
        ephemeral: true
      })
    }else{
      await interaction.reply({ 
        embeds:[{
          author:{
            name: "登録情報",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN",
          description: `ID\n\`${account[0].id}\`\nIPアドレス\n\`${account[0].ip}\`\n登録日時/更新日時\n\`${new Date(account[0].time).toLocaleString()}\``,
        }],
        ephemeral: true
      })
    }
  }
}