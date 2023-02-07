module.exports = async(message,client)=>{
  const fs = require("fs");
  const config = require("../../config.json");
  if(message.content.startsWith(`${config.prefix}exec`)){
    if(message.author.id !== `${config.admin}`) return message.reply("このコマンドは製作者専用です");
    if(message.content === `${config.prefix}exec`) return message.reply("実行するコードが必要です");
      const code = message.content.slice(6);
      const script = `module.exports = async(message,client)=>{\n  ${code}\n}`;
      try{
        fs.writeFileSync("./tmp/script.js",script,"utf8");
        const run = require("../../tmp/script");
        run(message,client);
      }catch(error){
        return message.reply(`実行中にエラーが発生しました[${error}]`);
      }
      delete require.cache[require.resolve("../../tmp/script")];
    }
}