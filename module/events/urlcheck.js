async function urlcheck(message){
  const fetch = require("node-fetch");
  if(message.content.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g)){
    const url = message.content.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g);

    try{
      fetch(`https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`).then(res => res.text()).then(norton => {
        if(norton.indexOf("［注意］") != -1){
          message.reply({
            embeds:[{
              title: "注意が必要なURLを検出しました",
              description: `［注意］の評価を受けた Web サイトは少数の脅威または迷惑を伴いますが、\n赤色の［警告］に相当するほど危険とは見なされません。サイトにアクセスする場合には注意が必要です。`,
              footer: {
                text: "Powered by Norton Safeweb"
              },
              color: "YELLOW"
            }]
          });
        }else if(norton.indexOf("警告") != -1){
          message.reply({
            embeds:[{
              title: "危険なURLを検出しました",
              description: `これは既知の危険な Web サイトです。\nこのページを表示**しない**ことを推奨します。`,
              footer: {
                text: "Powered by Norton Safeweb"
              },
              color: "RED"
            }]
          })
        }else{
          return;
        }
      });
    }catch{
      return;
    }
  }
}

module.exports = urlcheck