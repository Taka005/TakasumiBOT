module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "nslookup"){
    const name = interaction.options.getString("name");
    const type = interaction.options.getString("type");

    await interaction.deferReply();
    try{
      const data = await fetch(`https://dns.google/resolve?name=${name}&type=${type}`)
        .then(res=>res.json())

      await interaction.editReply({
        embeds:[{
          author:{
            name: "DNS情報を取得しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN",
          fields:[
            {
              name: "作者",
              value: "なし",
              inline: true
            }
          ],
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
          description: "名前解決ができませんでした"
        }],
        ephemeral: true
      });
    }
  }
}