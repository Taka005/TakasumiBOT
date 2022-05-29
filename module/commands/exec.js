async function node(message,client){
  const fs = require('fs');
  const config = require("../../config.json");
  if(message.content.startsWith(`${config.prefix}exec`)){
    if(message.author.id !== `${config.admin}`) return message.reply("このコマンドは製作者専用です");
    if(message.content === `${config.prefix}exec`) return message.reply("実行するコードが必要です");
      const code = message.content.slice(6);
      const script = `function script(message,client){\n  ${code}\n}\n\nmodule.exports = script`;
      try{
        fs.writeFileSync(`./note/script.js`, `${script}`, 'utf8');
      }catch(error){
        return message.reply(`ファイル書き込み中にエラーが発生しました\n[${error.message}]`);
      }
      try{
        const run = require("../../note/script");
        run(message,client);
      }catch(error){
        return message.reply(`実行中にエラーが発生しました[${error.message}]`);
      }finally{
        delete require.cache[require.resolve('../../note/script')];
      }
      return;
    }
}

module.exports = node