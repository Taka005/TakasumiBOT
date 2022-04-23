function bump(client){
    function sleep(waitSec, callback) {
        setTimeout(callback, waitSec);
      };

      client.on("messageCreate", (message) => {
        if (message.author.id == "302050872383242240") {
          if (
            message.embeds[0].description.match(/表示順をアップしたよ/) ||
            message.embeds[0].description.match(/Bump done/)
          ){
            message.channel.send({
                embeds:[{
                  color: "RANDOM",
                  title:
                    "DISBOARDからBumpしたことを受信しました！\nbumpの時間になったらまた通知します。",
                }]});

            sleep(60000 * 120, function () {
              message.channel.send(`<@&945676824984305704>\nbumpの時間です。/bumpで順位を上げよう!`);
            });
          }
        }
      });

}

module.exports = bump

/**
 * development by Taka005#1203
 *
 * please join the my discord server
 * https://discord.gg/GPs3npB63m
 */