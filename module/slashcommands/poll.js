async function poll(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "poll"){
    const title = await interaction.options.getString("title");
    const select_1 = await interaction.options.getString("select_1");
    const select_2 = await interaction.options.getString("select_2");
    const select_3 = await interaction.options.getString("select_3");
    const select_4 = await interaction.options.getString("select_4");
    const select_5 = await interaction.options.getString("select_5");
    const select_6 = await interaction.options.getString("select_6");
    const select_7 = await interaction.options.getString("select_7");
    const select_8 = await interaction.options.getString("select_8");
    const select_9 = await interaction.options.getString("select_9");
    const select_10 = await interaction.options.getString("select_10");
    const select_11 = await interaction.options.getString("select_11");
    const select_12 = await interaction.options.getString("select_12");

    const emojis = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱"];
    const selects = [select_1,select_2,select_3,select_4,select_5,select_6,select_7,select_8,select_9,select_10,select_11,select_12]
      .filter(select=>select!==null)

    const msg = await interaction.reply({
                embeds:[{
                  title: title,          
                  color: interaction.member.displayHexColor,
                  description: selects.map((c,i)=>`${emojis[i]}${c}`).join('\n'),
                  timestamp: new Date()
                }],
                fetchReply: true
    })
    try{
      await emojis.slice(0, selects.length).forEach(emoji => msg.react(emoji))
    }catch{
      await msg.edit({
        embeds:[{
          author: {
            name: "BOTに権限がありません",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "BOTにリアクションをつける権限がないため、コマンドが正常に完了できませんでした"
        }]
      });
    }
  }
}
    
module.exports = poll