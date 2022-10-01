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

    if(!interaction.guild.me.permissionsIn(interaction.channel).has("ADD_REACTIONS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドは、BOTに以下の権限が必要です\n```リアクションの追加```\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
      }],
      ephemeral:true
    });

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
    }catch(error){
      await msg.edit({
        embeds:[{
          author: {
            name: "作成できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "コマンドが正常に完了できませんでした",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }]
      });
    }
  }
}
    
module.exports = poll