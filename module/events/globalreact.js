async function globalreact(reaction,user){
  const global = require("../../data/global/main.json");
  if(reaction.emoji.name === "❌"||reaction.emoji.name === "✅"&&global[reaction.message.channel.id]){
    reaction.message.reply({
      embeds: [{
        color:"GREEN",
        description: "正常にメッセージが送信された場合は✅が付きますが、\nサーバーやユーザーがブラックリストに登録されている又は、正常に送信が完了できなかった場合のみ❌が付きます\n詳しくは[利用規約](https://taka.ml/bot/takasumi.html)をお読みください"
      }]
    })
  }
}

module.exports = globalreact