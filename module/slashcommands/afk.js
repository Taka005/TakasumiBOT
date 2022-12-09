module.exports = async(interaction)=>{
  const mysql = require("../lib/mysql.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "afk"){
    const message = await interaction.options.getString("message");

    const data = await mysql(`SELECT * FROM afk WHERE user = ${interaction.member.user.id} LIMIT 1;`);
    if(data[0]){
      await mysql(`DELETE FROM afk WHERE user = ${interaction.member.user.id} LIMIT 1;`);
      const time = new Date() - new Date(data[0].time);
      return interaction.reply({
        embeds:[{
          author: {
            name: "AFKを無効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `メンションは${data[0].mention}件ありました\n${Math.floor(time/1000)}秒間AFKでした`
        }]
      }); 
    }

    await mysql(`INSERT INTO afk (user, message, mention, time) VALUES(${interaction.member.user.id},"${message||"代わりのメッセージがありません"}",0,NOW());`);
    await interaction.reply({
      embeds:[{
        author: {
          name: "AFKを有効にしました",
          icon_url: "https://cdn.taka.ml/images/system/success.png",
        },
        color: "GREEN"
      }]
    });
  }
}