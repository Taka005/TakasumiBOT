async function embed_event(interaction){
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId === "embed"){
      const author = interaction.fields.getTextInputValue("author");
      const title = interaction.fields.getTextInputValue("title");
      const description = interaction.fields.getTextInputValue("description");
      const image = interaction.fields.getTextInputValue("image");
      if(!author && !title && !description && !image) return await interaction.reply({
        embeds:[{
          author: {
            name: "入力箇所が不足しています",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "記入欄を全て空にはできません"
        }],
        ephemeral:true
      });

      if(image){
        if(!image.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)) return await interaction.reply({
          embeds:[{
            author: {
              name: "入力された画像が無効です",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "画像はURLで指定する必要があります"
          }],
          ephemeral:true
        });
      }
      await interaction.reply({
        embeds:[{
          color: "RANDOM",
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
  
module.exports = embed_event