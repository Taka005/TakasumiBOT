async function ready(client){
  const config = require("../../config.json");
  const package = require("../../package.json");
  require("dotenv").config();
  const { SlashCommandBuilder, ContextMenuCommandBuilder } = require("@discordjs/builders");
  const { REST } = require("@discordjs/rest");
  const { Routes, ApplicationCommandType } = require("discord-api-types/v10");
    
  const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_BOT_TOKEN);

    let now = new Date();
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds() 
      
    let stats = 0; 
    setInterval(()=>{
      if(stats == 0){
        client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
          type: "PLAYING"
        });
        stats = 1;
      }else if(stats == 1){
        client.user.setActivity(`taka.ml || ver:${package.version}`, {
          type: "PLAYING"
        });
        stats = 2; 
      }else if(stats == 2){
        client.user.setActivity(`${client.guilds.cache.size}server || ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}user`,{
          type: "PLAYING"
        });
        stats = 0;
      }
    },6000)

    client.channels.cache.get("947484748773736538").send(`BOT、API、WEBサーバーが再起動されました`);

    //ログ
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:READY! USER:${client.user.tag}`); 
    console.info(`\x1b[34m[${h}:${m}:${s}]INFO:<${client.guilds.cache.size}>SERVER <${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}>USER`)

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

    const server = new SlashCommandBuilder()
      .setName("server")
      .setDescription("サーバーに関する情報を表示します")

    const status = new SlashCommandBuilder()
      .setName("status")
      .setDescription("BOTの状態を表示します")

    const draw = new SlashCommandBuilder()
      .setName("draw")
      .setDescription("おみくじを引きます")

    const output = new SlashCommandBuilder()
      .setName("export")
      .setDescription("サーバーの情報をJSON形式に出力します")

    const ticket = new SlashCommandBuilder()
      .setName("ticket")
      .setDescription("簡易的なお問い合わせ機能です")

    const news = new SlashCommandBuilder()
      .setName("news")
      .setDescription("最近のニュースを表示します")

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
      .setDescription("BOTにメッセージを表示させます")
      .addStringOption(option =>
        option
          .setName("text")
          .setDescription("発言内容")
          .setRequired(true))

    const npm = new SlashCommandBuilder()
      .setName("npm")
      .setDescription("NPMパッケージを検索します")
      .addStringOption(option =>
        option
          .setName("name")
          .setDescription("検索ワード")
          .setRequired(true))
    
    const wiki = new SlashCommandBuilder()
      .setName("wiki")
      .setDescription("wikipediaで検索して、表示します")
      .addStringOption(option =>
        option
          .setName("name")
          .setDescription("検索ワード")
          .setRequired(true))
    
    const channel = new SlashCommandBuilder()
      .setName("channel")
      .setDescription("指定したチャンネルにメッセージを表示させます")
      .addStringOption(option =>
        option
          .setName("text")
          .setDescription("発言内容")
          .setRequired(true))
      .addChannelOption(option =>
        option
          .setName("channel")
          .setDescription("送信するチャンネル")
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
      .setDescription("指定したユーザーの情報を表示します")
      .addStringOption(option =>
        option
          .setName("id")
          .setDescription("ユーザーID又はメンション"))

    const kick = new SlashCommandBuilder()
      .setName("kick")
      .setDescription("メンバーをサーバーからKICKします")
      .addUserOption(option =>
        option
          .setName("user")
          .setDescription("KICK対象のメンバー")
          .setRequired(true))
      .addStringOption(option =>
        option
          .setName("reason")
          .setDescription("KCIKした理由"))

    const ban = new SlashCommandBuilder()
      .setName("ban")
      .setDescription("ユーザーをサーバーからBANします")
      .addStringOption(option =>
        option
          .setName("user")
          .setDescription("ユーザーID又はメンション")
          .setRequired(true))
      .addStringOption(option =>
        option
          .setName("reason")
          .setDescription("BANした理由"))
      .addIntegerOption(option =>
        option
          .setName("days")
          .setDescription("メッセージを削除する日数"))
    
    const avatar = new SlashCommandBuilder()
      .setName("avatar")
      .setDescription("ユーザーのアバターを表示します")
      .addStringOption(option =>
        option
          .setName("id")
          .setDescription("ユーザーID又はメンション"))

    const short = new SlashCommandBuilder()
      .setName("short")
      .setDescription("短縮URLを作成します")
      .addStringOption(option =>
        option
          .setName("url")
          .setDescription("短縮するURL")
          .setRequired(true))

    const safeweb = new SlashCommandBuilder()
      .setName("safeweb")
      .setDescription("Webサイトの安全性を評価します")
      .addStringOption(option =>
        option
          .setName("url")
              .setDescription("対象のURL")
              .setRequired(true))

    const mc = new SlashCommandBuilder()
      .setName("mc")
      .setDescription("マインクラフトサーバーの情報を検索します")
      .addStringOption(option =>
        option
          .setName("edition")
          .setDescription("エディション")
          .setRequired(true)
          .addChoices(
            { name: "Java版", value: "je" },
            { name: "統合版", value: "be" }
          ))
      .addStringOption(option =>
        option
          .setName("ip")
          .setDescription("検索するサーバーのアドレス")
          .setRequired(true))

    const system = new SlashCommandBuilder()
      .setName("system")
      .setDescription("BOTの管理をします")
      .addStringOption(option =>
        option
          .setName("functions")
          .setDescription("操作")
          .setRequired(true)
          .addChoices(
            { name: "脱退", value: "leave" },
            { name: "削除", value: "delete" },
            { name: "ブロック/解除(サーバー)", value: "block_server" },
            { name: "ブロック/解除(ユーザー)", value: "block_user" },
            { name: "DM", value: "dm" },
            { name: "評価", value: "point" }
          ))
      .addStringOption(option =>
        option
          .setName("id")
          .setDescription("操作する対象のID")
          .setRequired(true))
      .addStringOption(option =>
        option
          .setName("message")
          .setDescription("メッセージ、理由、評価値(10.0~0.0)"))

    const global = new SlashCommandBuilder()
      .setName("global")
      .setDescription("グローバルチャットの切り替え")
          
    const poll = new SlashCommandBuilder()
      .setName("poll")
      .setDescription("アンケート機能です")
      .addStringOption(option =>
        option
          .setName("title")
          .setDescription("タイトル")
          .setRequired(true))
      .addStringOption(option =>
        option
          .setName("select_1")
          .setDescription("選択1")
          .setRequired(true))
      .addStringOption(option =>
        option
          .setName("select_2")
          .setDescription("選択2")
          .setRequired(true))
      .addStringOption(option =>
        option
          .setName("select_3")
          .setDescription("選択3"))
      .addStringOption(option =>
        option
          .setName("select_4")
          .setDescription("選択4"))
      .addStringOption(option =>
        option
          .setName("select_5")
          .setDescription("選択5"))
      .addStringOption(option =>
        option
          .setName("select_6")
          .setDescription("選択6"))
      .addStringOption(option =>
        option
          .setName("select_7")
          .setDescription("選択7"))
      .addStringOption(option =>
        option
          .setName("select_8")
          .setDescription("選択8"))
      .addStringOption(option =>
        option
          .setName("select_9")
          .setDescription("選択10"))
      .addStringOption(option =>
        option
          .setName("select_11")
          .setDescription("選択11"))
      .addStringOption(option =>
        option
          .setName("select_12")
          .setDescription("選択12"))
    
    //ContextMenu
    const member = new ContextMenuCommandBuilder()
      .setName("メンバー情報を表示")
      .setType(ApplicationCommandType.User)
          
    await rest.put(
      Routes.applicationCommands(client.application.id),
        { 
          body: [
            help,
            support,
            embed,
            server,
            status,
            draw,
            news,
            auth,
            ticket,
            panel,
            gif,
            say,
            npm,
            wiki,
            channel,
            del,
            output,
            invite,
            user,
            kick,
            ban,
            avatar,
            short,
            safeweb,
            mc,
            global,
            system,
            poll,
            //ContextMenu
            member
          ]
        },
    );
}

module.exports = ready