async function timer(message){
    const config = require("../../config.json")
    if(message.content.startsWith(`${config.prefix}timer`)){
        const time = message.content.split(" ").slice(1);
        if (!time[0]) return message.reply(`${config.prefix}timerの後に数字が必要です`);
          if(isNaN(time)) return message.reply("数字を入力してください");
          if (time < 1 || time > 300) return message.reply("設定値は1秒以上、300秒以下にしてください")   
            message.channel.send(`タイマーを${time}秒に設定しました。`)
            setTimeout(() => {
              message.reply(`${time}秒経ちました`)
            },time * 1000) 
      return;
    }
}

module.exports = timer