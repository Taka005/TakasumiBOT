function bump(message){
  const config = require("../../config.json");

  function sleep(waitSec, callback) {
    setTimeout(callback, waitSec);
  };
  if(message.author.id == "302050872383242240") {
    if(message.embeds[0].description.match(/表示順をアップしたよ/) ||message.embeds[0].description.match(/Bump done/)){
      message.channel.send({
        embeds:[{
          color: "RANDOM",
          title:`${config.bump_1}`,
        }]
      });

      sleep(60000 * 120, function () {
        message.channel.send(`${config.bump_2}`);
      });
    }
  }
}

module.exports = bump