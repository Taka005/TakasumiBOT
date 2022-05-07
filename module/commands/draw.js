async function draw(message){
    const config = require("../../config.json")
    const reply = `<@!${message.author.id}>`
    if(message.content === `${config.prefix}draw`){
        var arr = ["大吉", "中吉", "小吉","小吉", "吉","吉","吉","凶", "大凶"];
        var random = Math.floor(Math.random() * arr.length);
        var result = arr[random];
          message.reply({
            embeds:[{
              color: "RANDOM",
              description: `${result}`
            }]
          });
      return;
    }
}

module.exports = draw