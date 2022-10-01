async function cipher(interaction){
  const crypto = require("crypto");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "cipher"){
    const key = await interaction.options.getString("key");
    const text = await interaction.options.getString("text");
    const types = await interaction.options.getString("types");

    if(types === "cipher"){
      try{
        const cipher = crypto.createCipher("aes-128-cbc", key);
        cipher.update(text, "utf8", "hex");

        await interaction.reply({
          embeds:[{
            author: {
              name: "暗号を生成しました",
              icon_url: "https://cdn.taka.ml/images/success.png",
            },
          description: `暗号: \`\`\`${cipher.final("hex")}\`\`\`\n復号鍵: ||\`${key}\`||`,
            color: "GREEN"
          }]
        });
      }catch(error){
        await interaction.reply({
          embeds:[{
            author: {
              name: "暗号が生成できませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "もう一度試してください",
            fields: [
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }]
        });
      }
    }else{
      try{
        const decipher = crypto.createDecipher("aes-128-cbc", key);
        decipher.update(text, "hex", "utf8");

        await interaction.reply({
          embeds:[{
            author: {
              name: "暗号を復号しました",
              icon_url: "https://cdn.taka.ml/images/success.png",
            },
          description: `復号: \`\`\`${decipher.final("utf8")}\`\`\`\n復号鍵: ||\`${key}\`||`,
            color: "GREEN"
          }]
        });
      }catch(error){
        await interaction.reply({
          embeds:[{
            author: {
              name: "暗号が復号できませんでした",
              icon_url: "https://cdn.taka.ml/images/error.png",
            },
            color: "RED",
            description: "復号鍵が間違っている可能性があります",
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
}

module.exports = cipher