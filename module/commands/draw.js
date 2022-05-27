async function draw(message){
  const config = require("../../config.json")
  if(message.content === `${config.prefix}draw`){
    let arr = ["大吉", "中吉", "小吉","小吉", "吉","吉","吉","凶", "大凶"];
    let random = Math.floor(Math.random() * arr.length);
    let result = arr[random];
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