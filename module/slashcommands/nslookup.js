module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "nslookup"){
    const name = interaction.options.getString("name");

    await interaction.deferReply();
    try{
      const data = await fetch(`https://dns.google/resolve?name=${name}`)
        .then(res=>res.json());

      if(!data.Answer) return await interaction.editReply({
        embeds:[{
          author:{
            name: "DNS情報が取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "違うアドレスで試してください"
        }],
        ephemeral: true
      });

      await interaction.editReply({
        embeds:[{
          author:{
            name: `${name}の結果`,
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN",
          description: `\`\`\`${data.Answer.join("\n")}\`\`\``,
          footer:{
            text: "TakasumiBOT"
          }
        }]
      })
    }catch{
      await interaction.editReply({
        embeds:[{
          author:{
            name: "DNS情報が取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "違うアドレスを試してください"
        }],
        ephemeral: true
      });
    }
  }
}