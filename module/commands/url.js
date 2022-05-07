async function url(message){
    const config = require("../../config.json")
    const reply = `<@!${message.author.id}>`
    if (message.content.startsWith(`${config.prefix}url`)) {
        const attachment = message.content.split(" ").slice(1);
        message.delete()
        if (!attachment[0]) return message.channel.send(`${reply}ファイルのURLが必要です`);
          message.channel.send({ files: attachment })
            .catch(()=>message.channel.send(`${reply}無効なURLまたはファイルではありません`))
      return;
    }
}

module.exports = url