module.exports = async(interaction)=>{
  const isUrl = require("../lib/isUrl");
  const { MessageAttachment } = require("discord.js");
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "qr"){
    const text = interaction.options.getString("text");
    const type = interaction.options.getString("type");

    if(type === "gen"){
      await interaction.deferReply();
      await interaction.editReply({
        embeds:[{
          color: "GREEN",
          title: "生成中..."
        }]
      });
      const qr_response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(text)}&size=256x256&format=png`)
        .then(res =>res.arrayBuffer()) 
        .catch(()=>{})

      await interaction.editReply({
        embeds:[{
          author: {
            name: "QRコードを作成しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          description: `内容\n\`\`\`${text}\`\`\``,
          image: {
            url: "attachment://QRCode.png"
          },
          color: "GREEN"
        }],
        files:[new MessageAttachment(Buffer.from(qr_response),"QRCode.png")]
      });
    }else{
      if(!isUrl(text)) return await interaction.reply({
        embeds:[{
          author: {
            name: "入力されたテキストが無効です",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "QRコードはURLで指定する必要があります"
        }],
        ephemeral:true
      });

      await interaction.deferReply();
      await interaction.editReply({
        embeds:[{
          color: "GREEN",
          title: "読み取り中..."
        }]
      });
      const qr_response = await fetch(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURI(text)}`)
        .then(res =>res.json()) 
        .catch(()=>{})

      if(qr_response[0].symbol[0].error) return await interaction.editReply({
        embeds:[{
          author: {
            name: "QRコードが読み取れません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "QRコードはURLかつ、読み取れる必要があります"
        }]
      });

      await interaction.editReply({
        embeds:[{
          author: {
            name: "QRコードを読み取りました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          description: `内容\n\`\`\`${qr_response[0].symbol[0].data}\`\`\``,
          color: "GREEN"
        }]
      });
    }
  }
}