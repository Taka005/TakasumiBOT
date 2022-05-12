async function poll(message){
    const config = require("../../config.json")
    const reply = `<@!${message.author.id}>`
    let [command, ...args] = message.content.slice(config.prefix.length).split(' ')
    if(command === 'poll'){
      const [title, ...choices] = args
        if(!title) return message.channel.send(`${reply}タイトルと選択肢を指定してください`)
          message.delete()
        const emojis = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹']
        if(choices.length < 2 || choices.length > emojis.length)
          return message.channel.send(`${reply}選択肢は2から${emojis.length}個を指定してください`)
        const poll = await message.channel.send({
                    embeds:[{
                      title: title,
                      color: "RANDOM",
                      description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n'),
                      timestamp: new Date(),
                      footer: {
                        text: `${message.author.tag}によって送信`
                      }
                    }]
        });
      emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
      return;
    } 
}

module.exports = poll