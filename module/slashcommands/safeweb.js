async function safeweb(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "safeweb"){
    const url = await interaction.options.getString("url");

    if(!url.match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g)) return await interaction.reply({
      embeds:[{
        author: {
          name: "安全性を評価できませんでした",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "URLを指定する必要があります"
      }],
      ephemeral:true
    });

    await interaction.deferReply();
    try{
      fetch(`https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`)
        .then(res => res.text())
        .then(norton =>{

        if(norton.indexOf("［注意］") !== -1){
          interaction.followUp({
            embeds:[{
              author: {
                name: "このサイトは注意が必要です",
                icon_url: "https://cdn.taka.ml/images/warn.png",
                url: `https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`,
              },
              description: `注意の評価を受けた Web サイトは少数の脅威または迷惑を伴いますが、\n警告に相当するほど危険とは見なされません。サイトにアクセスする場合には注意が必要です。\n\n※注意の評価は、誤判定の可能性があります`,
              footer: {
                text: "Powered by Norton Safeweb"
              },
              color: "YELLOW"
            }]
          });
        }else if(norton.indexOf("警告") !== -1){
          interaction.followUp({
            embeds:[{
              author: {
                name: "このサイトは危険です",
                icon_url: "https://cdn.taka.ml/images/error.png",
                url: `https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`,
              },
              description: `これは既知の危険な Web サイトです。\nこのページを表示**しない**ことを推奨します。`,
              footer: {
                text: "Powered by Norton Safeweb"
              },
              color: "RED"
            }]
          })
        }else if(norton.indexOf("未評価") !== -1){
          interaction.followUp({
            embeds:[{
              author: {
                name: "このサイトは評価されていません",
                icon_url: "https://cdn.taka.ml/images/config.png",
                url: `https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`,
              },
              description: `サイトは未評価のため、接続には注意が必要な可能性があります`,
              footer: {
                text: "Powered by Norton Safeweb"
              },
              color: "GREY"
            }]
          })
        }else{
          interaction.followUp({
            embeds:[{
              author: {
                name: "このサイトは安全です",
                icon_url: "https://cdn.taka.ml/images/success.png",
                url: `https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`,
              },
              description: `サイトからは脅威が確認されませんでした。\n安全に接続が可能です`,
              footer: {
                text: "Powered by Norton Safeweb"
              },
              color: "GREEN"
            }]
          })
        }
      });
    }catch(error){
      interaction.followUp({
        embeds:[{
          author: {
            name: "安全性を評価できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "サイトの取得に失敗しました",
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

module.exports = safeweb