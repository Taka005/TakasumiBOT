function antitoken(message){
    if (message.content.match(/[MN][A-Za-z\d]{23}.[\w-]{6}.[/w-]{27}/g)) {
        const member = message.guild.members.cache.get(message.author.id);
        member.timeout(5000000,"TOKENの送信")
            .then(()=>message.channel.send(`TOKENの送信は禁止されてます`))
            .catch(()=>message.channel.send("エラー"));
        message.delete()
            .catch(()=>message.channel.send("エラー"));
    }
}

module.exports = antitoken