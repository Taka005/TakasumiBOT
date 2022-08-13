async function invite(guild){
  guild.channels.cache.map((channel) =>{
    if(channel.type === "GUILD_TEXT"&&guild.me.permissionsIn(channel).has("VIEW_CHANNEL")&&guild.me.permissionsIn(channel).has("SEND_MESSAGES")){
      return channel.send({
        embeds: [{
          color:"GREEN",
          thumbnail: {
            url: "https://taka.ml/images/bot.png"
          },
          title:"BOT導入ありがとう!",
          description: "やっほー。TakasumiBOTだよ、便利な機能を備えた万能BOTです\nグローバルチャット、カスタム埋め込み作成、認証機能いろいろあるよ!\nコマンドのhelpを表示する時は`/help`を実行してね\n\n質問がある？[サポートサーバー](https://discord.gg/GPs3npB63m)に入ってみてね\n[みんなの意見](https://taka.ml/feedback/)もお待ちしています!",
          timestamp: new Date()
        }]
      });
    }
  });
  return;
}

module.exports = invite