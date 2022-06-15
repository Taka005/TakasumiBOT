async function embed(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId === `embed`){
      const author = interaction.fields.getTextInputValue('author');
      const title = interaction.fields.getTextInputValue('title');
      const description = interaction.fields.getTextInputValue('description');
      const image = interaction.fields.getTextInputValue('image');
      if(!author && !title && !description && !image) return await interaction.reply({content: "埋め込みの要素を全て空にはできません...",ephemeral: true})
      if(image){
        if(!image.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)) return await interaction.reply({content: "画像のURLは`http://`又は`https://`で始まっている必要があります...",ephemeral: true})
      }
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