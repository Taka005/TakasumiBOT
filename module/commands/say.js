async function say(message){
  const config = require("../../config.json")
    if(message.content.startsWith(`${config.prefix}say`)){
        const args = message.content.slice(5);
          message.delete()     
          message.channel.send(`${args.replace("@","＠") || "表示するテキストがありません"}`)
      return;
    }
};

module.exports = say