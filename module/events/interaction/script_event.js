module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("script_")){
    const lang = interaction.customId.split("_");
    const code = interaction.fields.getTextInputValue("code");
  
    const language = {
      "JavaScript": {
        "type": "js",
        "compiler": "nodejs-16.14.0"
      },
      "Python": {
        "type": "py",
        "compiler": "cpython-3.10.2"
      },
      "Bash": {
        "type": "bash",
        "compiler": "bash"
      }
    };

    let timeout = false;
    setTimeout(async()=>{
      timeout = true;
      await interaction.reply({
        embeds:[{
          author: {
            name: "正常に実行できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "実行がタイムアウトしました",
          footer: {
            text:`${lang[1]} || TakasumiBOT`
          }
        }]
      }).catch(()=>{})
    },2500);

    const res = await fetch("https://wandbox.org/api/compile.json",{
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "code": code,
        "compiler": language[lang[1]].compiler
      })
    })
      .then(res=>res.json())
      .catch(()=>{
        timeout = true;
      })

    if(timeout) return;

    if(res.status === "0"){
      await interaction.reply({
        embeds:[{
          color: "GREEN",
          author: {
            name: "正常に実行しました",
            icon_url: "https://cdn.taka.ml/images/system/success.png",
          },
          description: `**コード**\n\`\`\`${language[lang[1]].type}\n${code}\`\`\`\n**結果**\n\`\`\`${res.program_output}\`\`\``,
          footer: {
            text:`${lang[1]} || TakasumiBOT`
          }
        }]
      }).catch(async()=>{
        await interaction.reply({
          embeds:[{
            author: {
              name: "正常に実行できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: `**コード**\n\`\`\`${language[lang[1]].type}\n${code}\`\`\`\n**エラー**\n結果が長すぎます`,
            footer: {
              text:`${lang[1]} || TakasumiBOT`
            }
          }]
        });
      })
    }else{
      await interaction.reply({
        embeds:[{
          author: {
            name: "正常に実行できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: `**コード**\n\`\`\`${language[lang[1]].type}\n${code}\`\`\`\n**エラー**\n\`\`\`${res.program_error}\`\`\``,
          footer: {
            text:`${lang[1]} || TakasumiBOT`
          }
        }]
      }).catch(async()=>{
        await interaction.reply({
          embeds:[{
            author: {
              name: "正常に実行できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png",
            },
            color: "RED",
            description: `**コード**\n\`\`\`${language[lang[1]].type}\n${code}\`\`\`\n**エラー**\n結果が長すぎます`,
            footer: {
              text:`${lang[1]} || TakasumiBOT`
            }
          }]
        });
      })
    }
  }
}