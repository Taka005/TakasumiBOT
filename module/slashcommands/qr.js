async function qr(interaction){
  const { MessageAttachment } = require("discord.js")
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "qr"){
    const text = await interaction.options.getString("text");
    const types = await interaction.options.getString("types");

    if(types == "gen"){
      await interaction.deferReply();
      const qr_response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(text)}&size=256x256&format=png`)
        .then(res =>res.arrayBuffer()) 
        .catch(()=>{})

      await interaction.editReply({
        embeds:[{
          author: {
            name: "QRコードを作成しました",
            icon_url: "https://taka.ml/images/success.png",
          },
          description: `作成内容\n\`\`\`${text}\`\`\``,
          color: "GREEN"
        }],
        files:[new MessageAttachment(Buffer.from(qr_response), `QRCode.png`)]
      });

    }else if(types == "read"){
      if(!text.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)) return await interaction.reply({
        embeds:[{
          author: {
            name: "入力されたテキストが無効です",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "QRコードはURLで指定する必要があります"
        }],
        ephemeral:true
      });

      await interaction.deferReply();
      const qr_response = await fetch(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURI(text)}`)
        .then(res =>res.json()) 
        .catch(()=>{})

      if(qr_response.symbol?.error) return await interaction.editReply({
          embeds:[{
            author: {
              name: "入力した内容が、正しく指定されていません",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: "QRコードはURLかつ、読み取れる形式です"
          }]
      });

      await interaction.editReply({
        embeds:[{
          author: {
            name: "QRコードを読み取りました",
            icon_url: "https://taka.ml/images/success.png",
          },
          description: `内容\n\`\`\`${qr_response.symbol.data}\`\`\``,
          color: "GREEN"
        }]
      });
    }
      return;
  }
}
  
  module.exports = qr