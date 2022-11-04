module.exports = async(guild)=>{
  let find = 0;
  guild.channels.cache.map((channel) =>{
    if(find === 0){
      if(channel.type === "GUILD_TEXT"&&guild.me.permissionsIn(channel).has("VIEW_CHANNEL")&&guild.me.permissionsIn(channel).has("SEND_MESSAGES")){
        channel.send({
          embeds: [{
            color:"GREEN",
            thumbnail: {
              url: "https://cdn.taka.ml/images/bot.png"
            },
            title:"BOT導入ありがとうございます!",
            description: "やっほー。TakasumiBOTだよ\n便利な機能を備えた万能BOTです\n\nグローバルチャット、カスタム埋め込み作成、認証機能いろいろあるよ!\nコマンドのhelpを表示する時は`/help`を実行してね\n\n質問がある？[サポートサーバー](https://discord.gg/GPs3npB63m)に入ってみてね",
            timestamp: new Date()
          }]
        });
        return find = 1;
      }
    }
  });
}