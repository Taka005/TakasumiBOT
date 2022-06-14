async function embed(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId === `embed`){
      const author = interaction.fields.getTextInputValue('author');
      const title = interaction.fields.getTextInputValue('title');
      const description = interaction.fields.getTextInputValue('description');
      const image = interaction.fields.getTextInputValue('imaga');
      if(!author && !title && !description && !image) return await interaction.reply({content: "埋め込みの要素を全て空にはできません...",ephemeral: true})
      await interaction.channel.send({
        embeds:[{
          color: message.member.displayHexColor,
          author: {
            name: `${author}`
          },
          title:`${title}`,
          description: `${description}`,
          image: {
            url: `${image}`
          }
        }]
      })
      .catch(()=>interaction.reply({content: "埋め込みを正常に送信できませんでした...",ephemeral: true}))
      return;
    }
}
  
module.exports = embed