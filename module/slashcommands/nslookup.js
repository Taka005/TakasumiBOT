module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "nslookup"){
    const name = interaction.options.getString("name");
    const type = interaction.options.getString("type");

    await interaction.deferReply();
    try{
      const data = await fetch(`https://dns.google/resolve?name=${name}&type=${type}`)
        .then(res=>res.json());

      if(!data.Answer) return await interaction.editReply({
        embeds:[{
          author:{
            name: "DNS情報が取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "指定したタイプで取得出来ませんでした"
        }],
        ephemeral: true
      });

      await interaction.editReply({
        embeds:[{
          author:{
            name: `${data.Question[0].name}レコードを取得しました`,
            icon_url: "https://cdn.taka.ml/images/system/success.png"
          },
          color: "GREEN",
          fields:[
            data.Answer.map(a=>(
              {
                name: "作者",
                value: "なし"
              }
            ))
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
          description: "違うアドレスを試してください"
        }],
        ephemeral: true
      });
    }
  }
}