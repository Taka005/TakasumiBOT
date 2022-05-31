async function global(message,client){
  const config = require("../../config.json")

  if(message.content === `${config.prefix}global`){
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`${config.prefix}globalを使うには「チャンネル管理」の権限が必要です`);
    if(message.channel.topic.match("GLOBAL")){
      message.channel.setTopic("再度、グローバルチャットをご利用いただくには、\n`>global`と入力して下さい")
        .then(()=>message.channel.send("正常にグローバルチャットから切断されました...\n再度接続するには`>global`と入力して下さい"))
        .catch(()=>message.channel.send("グローバルチャットからの切断が失敗しました...\nBOTの権限等を確認してください\nサポートサーバー:https://discord.gg/GPs3npB63m"))
    }else{
      message.channel.setTopic("GLOBAL")
        .then(()=>client.channels.cache.filter(channel => channel.topic == "GLOBAL")
                    .forEach((channel) => {
                      channel.send({
                        embeds:[{
                          color: "WHITE",
                          author: {
                            name: message.guild.name,
                            icon_url: message.guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/0.png"
                          },
                          description: `グローバルチャットに新しいサーバーが参加しました！\n みんなで挨拶してみましょう！\n\n※チャットを利用した場合、[利用規約](http://takabot.f5.si/terms.html)に同意されたことになります。必ずご確認ください`,
                          timestamp: new Date()
                        }]}
                      );
                    })
        )
        .catch(()=>message.channel.send("グローバルチャットへの接続に失敗しました...\nBOTの権限等を確認してください\nサポートサーバー:https://discord.gg/GPs3npB63m"))
    }
  }
}

module.exports = global