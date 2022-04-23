function node(client){
  const fs = require('fs');
    client.on("messageCreate", (message) => {
      if(message.content.startsWith(">node")){
        if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
          if(!message.author.id === "790489873957781536") return message.reply("このコマンドは製作者のみ実行出来ます");
          const code = message.content.slice(6).replace("```", "").replace("```", "");
          const script = `function script(message){\n  ${code}\n}\n\nmodule.exports = script`
          try{
            fs.writeFileSync(`./commands/node/script.js`, `${script}`, 'utf8');
          }catch{
            return message.reply("ファイル書き込み中にエラーが発生しました");
          }
          try{
            const run = require("./node/script.js")
            run(message)
          }catch{
            return message.reply("実行中にエラーが発生しました")
          }
      }
    });
}

module.exports = node