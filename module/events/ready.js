async function ready(client){
  const config = require("../../config.json");
  const { SlashCommandBuilder } = require('@discordjs/builders');
    
    let now = new Date();
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds() 
      
    let stats = 0; 
    setInterval(() => {
      if(stats == 0){
        client.user.setActivity(`Created by Taka005#1203`, {
          type: 'PLAYING'
        });      
        stats = 1;
      }else if(stats == 1){
        client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
          type: 'PLAYING'
        });
        stats = 2;
      }else if(stats == 2){
        client.user.setActivity(`taka.ml || ver:${config.version}`, {
          type: 'PLAYING'
        });
        stats = 3; 
      }else if(stats == 3){
        client.user.setActivity(`${client.guilds.cache.size}server || ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}user`,{
          type: 'PLAYING'
        });
        stats = 0;
      }
    }, 8000)

    client.channels.cache.get("947484748773736538").send(`BOT、API、WEBサーバーが再起動されました`);

    //console
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`); 
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:<${client.guilds.cache.size}>SERVER`)

    //スラッシュコマンド
    new SlashCommandBuilder()
      .setName("help")
      .setDescription("使い方がわかります")

    new SlashCommandBuilder()
      .setName("support")
      .setDescription("バグの報告、質問などの報告をします")

    new SlashCommandBuilder()
      .setName("embed")
      .setDescription("バグの報告、質問などの報告をします")

    new SlashCommandBuilder()
      .setName("auth")
      .setDescription("簡易的なロール認証機能です")
      .addRoleOption(option =>
        option
          .setName("role")
          .setDescription("認証成功時に付与するロール")
          .setRequired(true))

    new SlashCommandBuilder()
      .setName("gif")
      .setDescription("GIF画像を検索して、表示します")
      .addStringOption(option =>
        option
          .setName("name")
          .setDescription("検索ワード")
          .setRequired(true))

    new SlashCommandBuilder()
      .setName("say")
      .setDescription("BOTにテキストメッセージを表示させます")
      .addStringOption(option =>
        option
          .setName("text")
          .setDescription("")
          .setRequired(true))
}

module.exports = ready