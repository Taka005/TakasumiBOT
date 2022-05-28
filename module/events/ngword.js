function ngword(message,client){
  const reply = `<@!${message.author.id}>`
  if(message.author.bot) return;  
  if(message.content.match(/しね|ころす|殺害|死ね|殺す|きっしょ|ゴミ|コカイン|大麻|基地外|fuck|ポルノ|麻薬|アダルト|糞|カス/)) {
    message.delete();
    client.users.cache.get(message.author.id).send(`不適切な表現が含まれていたため、削除しました`)
      .catch(()=>message.channel.send(`${reply}不適切な表現が含まれていたため、削除しました。`))
  }
}
  
module.exports = ngword