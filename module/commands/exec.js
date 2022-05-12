async function node(message){
    const fs = require('fs');
    const config = require("../../config.json");
    if(message.content.startsWith(`${config.prefix}exec`)){
      if(message.author.id === `${config.admin}`){
          const code = message.content.slice(6)
          const script = `function script(message){\n  ${code}\n}\n\nmodule.exports = script`
          try{
            fs.writeFileSync(`./note/script.js`, `${script}`, 'utf8');
          }catch{
            return message.reply("ファイル書き込み中にエラーが発生しました");
          }
          try{
            const run = require("../../note/script")
            run(message)
          }catch{
            return message.reply("実行中にエラーが発生しました")
          }finally{
            delete require.cache[require.resolve('../../note/script')];
          }
        return;
      }
    }
}

module.exports = node