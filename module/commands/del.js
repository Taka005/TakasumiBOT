async function del(message){
  const config = require("../../config.json")
  const reply = `<@!${message.author.id}>`
    if(message.content.startsWith(`${config.prefix}del`)){
      const del = message.content.split(" ").slice(1);
        message.delete()
      if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${reply}${config.prefix}delを使う権限がありません`);
        if(!del[0]) return message.channel.send(`${reply}削除する数を指定してください`);
        if(isNaN(del)) return message.channel.send(`${reply}数字を入力してください`)
        if(del < 2 || del > 80 ) return message.channel.send(`${reply}削除する数は2以上、80以下にしてください`)   
          let messages = await message.channel.messages.fetch({ limit: del })         
            message.channel.bulkDelete(messages)
              .then(()=> message.channel.send(`${reply}${del}個のメッセージを削除しました。`))
              .catch(()=> message.channel.send(`${reply}削除できないメッセージが含まれています`)) 
      return;
    }
}

module.exports = del