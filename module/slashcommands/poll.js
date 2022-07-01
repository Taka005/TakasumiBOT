async function poll(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "poll"){
    const title = await interaction.options.getString("title");
    const select_1 = await interaction.options.getString("select_1");
    const select_2 = await interaction.options.getString("select_2");
    const select_3 = await interaction.options.getString("select_3");
    const emojis = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹'];
    const selects = [select_1,select_2,select_3].filter(select=>select!==null)
    const msg = await interaction.channel.send({
                embeds:[{
                  title: title,
                  color: "RANDOM",
                  description: selects.map((c,i)=>`${emojis[i]}${c}`).join('\n'),
                  timestamp: new Date(),
                  footer: {
                    text: `${interaction.member.user.tag}によって送信`
                  }
                }]
    })
    .then(()=>interaction.deferReply()
      .then(()=>interaction.deleteReply())
    )
    .catch(()=>{
      return interaction.reply({ 
        embeds:[{
          author: {
            name: "アンケートが正常に作成できません",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "BOTの権限等を確認し、もう一度やってください\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
        }], 
        ephemeral: true 
      })
    });
    emojis.slice(0, selects.length).forEach(emoji => msg.react(emoji))
    return;
  }
}
    
module.exports = poll