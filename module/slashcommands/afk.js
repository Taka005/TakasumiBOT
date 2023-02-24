module.exports = async(interaction)=>{
  const mysql = require("../lib/mysql");
  const time = require("../lib/time");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "afk"){
    const message = interaction.options.getString("message")||"メッセージはありません";
    
    if(message.length>300) return await interaction.reply({
      embeds:[{
        author:{
          name: "メッセージが長すぎます",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "300文字未満になるように調整してください"
      }],
      ephemeral: true
    });

    const data = await mysql(`SELECT * FROM afk WHERE user = ${interaction.member.user.id} LIMIT 1;`);
    if(data[0]){
      await mysql(`DELETE FROM afk WHERE user = ${interaction.member.user.id} LIMIT 1;`);
      await interaction.reply({
        embeds:[{
          author:{
            name: "AFKを無効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN",
          description: `メンションは${data[0].mention}件ありました\n${time(new Date()-new Date(data[0].time))}秒間AFKでした`
        }]
      }); 
    }else{
      await mysql(`INSERT INTO afk (user, message, mention, time) VALUES("${interaction.member.user.id}","${message}","0",NOW());`);
      await interaction.reply({
        embeds:[{
          author:{
            name: "AFKを有効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN"
        }]
      });
    }
  }
}