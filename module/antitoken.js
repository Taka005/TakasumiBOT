function antitoken(message){
    const reply = `<@!${message.author.id}>`
    if (message.content.match(/[MN][A-Za-z\d]{23}.[\w-]{6}.[/w-]{27}/g)) {
        const member = message.guild.members.cache.get(message.author.id);
        member.timeout(5000000,"TOKENの送信")
            .then(()=>message.channel.send(`${reply}TOKENの送信は禁止されてます`))
            .catch(()=>{return});
        message.delete()
            .catch(()=>{return});
    }
}

module.exports = antitoken