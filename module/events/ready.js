async function ready(client){
  const config = require("../../config.json");
  require("dotenv").config();
  const { SlashCommandBuilder } = require("@discordjs/builders");
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v10");
    
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

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
    const help = new SlashCommandBuilder()
      .setName("help")
      .setDescription("使い方がわかります")

    const support = new SlashCommandBuilder()
      .setName("support")
      .setDescription("バグの報告、質問などの報告をします")

    const invite = new SlashCommandBuilder()
      .setName("invite")
      .setDescription("BOTの招待や、情報を表示します")

    const embed = new SlashCommandBuilder()
      .setName("embed")
      .setDescription("簡単に埋め込みメッセージを作成します")

    const auth = new SlashCommandBuilder()
      .setName("auth")
      .setDescription("簡易的なロール認証機能です")
      .addRoleOption(option =>
        option
          .setName("role")
          .setDescription("認証成功時に付与するロール")
          .setRequired(true))

    const panel = new SlashCommandBuilder()
      .setName("panel")
      .setDescription("より強力なロール認証機能です")
      .addRoleOption(option =>
        option
          .setName("role")
          .setDescription("認証成功時に付与するロール")
          .setRequired(true))

    const gif = new SlashCommandBuilder()
      .setName("gif")
      .setDescription("GIF画像を検索して、表示します")
      .addStringOption(option =>
        option
          .setName("name")
          .setDescription("検索ワード")
          .setRequired(true))

    const say = new SlashCommandBuilder()
      .setName("say")
      .setDescription("BOTにテキストメッセージを表示させます")
      .addStringOption(option =>
        option
          .setName("text")
          .setDescription("発言内容")
          .setRequired(true))

    const del = new SlashCommandBuilder()
      .setName("del")
      .setDescription("メッセージを一括で削除します")
      .addIntegerOption(option =>
        option
          .setName("number")
          .setDescription("削除数")
          .setRequired(true))

    const user = new SlashCommandBuilder()
      .setName("user")
      .setDescription("ユーザー情報を表示します")
      .addStringOption(option =>
        option
          .setName("id")
          .setDescription("ユーザーID又はメンション"))

    await rest.put(
      Routes.applicationCommands(client.application.id),
        { 
          body: [
            help,
            support,
            embed,
            auth,
            panel,
            gif,
            say,
            del,
            invite,
            user
          ]
        },
    );
}

module.exports = ready