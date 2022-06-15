async function embed(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId === `embed`){
      const author = interaction.fields.getTextInputValue('author');
      const title = interaction.fields.getTextInputValue('title');
      const description = interaction.fields.getTextInputValue('description');
      const image = interaction.fields.getTextInputValue('image');
      if(!author && !title && !description && !image) return await interaction.reply({content: "埋め込みの要素を全て空にはできません...",ephemeral: true})
      await interaction.reply({
        embeds:[{
          color: interaction.member.displayHexColor,
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
      return;
    }
}
  
module.exports = embed