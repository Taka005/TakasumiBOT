module.exports = async(interaction)=>{
  const mysql = require("../lib/mysql.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "afk"){
    const message = await interaction.options.getString("message");

    const data = await mysql(`SELECT * FROM afk WHERE user = ${interaction.member.user.id} LIMIT 1;`);
    if(data.length > 0){
      await mysql(`DELETE FROM afk WHERE user = ${interaction.member.user.id} LIMIT 1;`);
      const time = new Date() - new Date(data.time);
      const format = `${Math.floor(time/1000/60/60)%24}時間${Math.floor(time/1000/60)%60}分${Math.floor(time/1000)%60}秒`
      return interaction.reply({
        embeds:[{
          author: {
            name: "AFKを無効にしました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          color: "GREEN",
          description: `メンションは${data.mention}件ありました\n${format}間AFKでした`
        }]
      }); 
    }

    await mysql(`INSERT INTO afk (user, message, mention, time) VALUES(${interaction.member.user.id},"${message}",0,NOW());`);
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