async function hello(message){
  const config = require("../../config.json");
  if(message.content === `${config.prefix}` ){
    message.reply({
      embeds:[{
        title: "ようこそ！",
        description: "製作者:Taka005#1203\n" + "プレフィックスは`>`又は`/`です",
        color: "WHITE",
        footer: {
          text: "サポートサーバー\n  https://discord.gg/GPs3npB63m"
        },
        fields: [
          {
            name: "**このBOTは？**",
            value: "雑用BOTでさまざまな機能があります\n大手BOTにはない機能などが備わっています"
          },
          {
            name: "**使うには？**",
            value: "`/help`で機能一覧を表示しましょう"
          },
          {
            name: "**わからない時には?**",
            value: "サポートサーバーへ行って聞いてきましょう\n入ってくれると製作者が喜びます"
          }
        ]
      }]
    })
    return;
  }
}

module.exports = hello