module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("script_")){
    const lang = interaction.customId.split("_");
    const code = interaction.fields.getTextInputValue("code");
  
    const compiler = {
      "JavaScript": "Nodejs-16.14.0",
      "TypeScript": "TypeScript-4.2.4",
      "Python": "CPython-3.10.2",
      "Bash": "bash-5.0.17(1)-release",
      "PHP": "php-8.0.3",
    };

    const res = await fetch("https://wandbox.org/api/compile.json",{
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "code": code,
        "compiler": compiler[lang[1]]
      })
    })
      .then(res=>res.text())
      .catch(()=>{})

    console.log(res)
    if(res.status === "0"){
      await interaction.reply({
        embeds:[{
          color: "GREEN",
          author: {
            name: "正常に実行しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          description: `\`\`\`${res.program_output}\`\`\``,
          footer: {
            text:`${lang}||TakasumiBOT`
          }
        }]
      });
    }else if(res.status === "1"){
      await interaction.reply({
        embeds:[{
          author: {
            name: "正常に実行できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: `\`\`\`${res.program_error}\`\`\``,
          footer: {
            text:`${lang}||TakasumiBOT`
          }
        }]
      });
    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "正常に実行できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "不明なステータスコードです\nもう一度やり直してください",
          footer: {
            text:`${lang}||TakasumiBOT`
          }
        }]
      });
    }
  }
}