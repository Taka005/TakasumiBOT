module.exports = async(interaction)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isButton()) return;
  if(interaction.customId.startsWith("page")){

    const id = interaction.customId.split("_");
    if(await check(interaction,id[2])) return;

    //1ページ目
    if(interaction.customId.startsWith("page_1")){
      await interaction.message.edit({
        embeds:[{
          title: "HELP 便利系",
          color: "GREEN",
          fields:[
            {
              name: "/poll",
              value: "アンケートを作成することができます\n最大で選択肢は12個までです"
            },
            {
              name: "/global",
              value: "色々なサーバーと繋がるグローバルチャットを有効、無効にします\n[利用規約](https://gc.taka.ml/)を読んでから使用してください"
            },
            {
              name: "/gif",
              value: "GIF画像を検索して表示します"
            },
            {
              name: "/embed",
              value: "埋め込みを簡単に作成し、表示できます\n※実行するには`メッセージの管理の権限が必要です`"
            },
            {
              name: "/wiki",
              value: "Wikipediaの検索をします"
            },
            {
              name: "/hiroyuki",
              value: "ひろゆきを召喚します"
            },
            {
              name: "/short",
              value: "短縮URLを作成します"
            }
          ]
        }],
        components:[
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("前")
                .setCustomId(`page_5_${id[2]}`))
            .addComponents(
              new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("1ページ")
                .setCustomId("page")
                .setDisabled(true))
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("次")
                .setCustomId(`page_2_${id[2]}`))
        ]
      })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async(error)=>{
        await err(interaction,error)
      })
    }
    //2ページ目
    if(interaction.customId.startsWith("page_2")){
      await interaction.message.edit({
        embeds:[{
          title: "HELP 認証・情報系",
          color: "GREEN",
          fields:[
            {
              name: "/auth",
              value: "メンバー認証を設定します\n数種類の認証方式を設定できます"
            },
            {
              name: "/guideline",
              value: "サーバーのガイドラインを作成し、同意するとロールが付与されます"
            },
            {
              name: "/user",
              value: "指定されたユーザーを検索して表示します\n検索対象がサーバー内にいる場合は、詳しい情報まで取得可能です"
            },
            {
              name: "/server",
              value: "サーバーの情報を表示します"
            },
            {
              name: "/role",
              value: "指定した役職の情報を表示します"
            },
            {
              name: "/emoji",
              value: "指定した絵文字の情報を表示します"
            },
            {
              name: "/avatar",
              value: "指定されたユーザーのアイコンを表示します\n使い方は`/user`と同じです"
            },
            {
              name: "/permission",
              value: "指定されたユーザーの権限を表示します\n使い方は`/user`と同じです"
            },
            {
              name: "/translate",
              value: "テキストを翻訳します"
            }
          ]
        }],
        components:[
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("前")
                .setCustomId(`page_1_${id[2]}`))
            .addComponents(
              new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("2ページ")
                .setCustomId("page")
                .setDisabled(true))
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("次")
                .setCustomId(`page_3_${id[2]}`))
        ]
      })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async(error)=>{
        await err(interaction,error)
      })
    }
    //3ページ目
    if(interaction.customId.startsWith("page_3")){
      await interaction.message.edit({
        embeds:[{
          title: "HELP サーバー管理系",
          color: "GREEN",
          fields:[
            {
              name: "/ban",
              value: "指定されたメンバーをサーバーからBANすることができます"
            },
            {
              name: "/kick",
              value: "指定されたメンバーをサーバーからKICKすることができます"
            },
            {
              name: "/timeout",
              value: "指定されたメンバーをタイムアウトすることができます"
            },
            {
              name: "/del",
              value: "指定された数だけ、メッセージを一括で削除します\n ※二週間前かつ、100個以上のメッセージは削除できません"
            },
            {
              name: "/warn",
              value: "指定されたメンバーを警告します\n ※メンバーがDMを拒否している場合警告できません"
            },
            {
              name: "/panel",
              value: "役職パネルを作成します"
            },
            {
              name: "/colorrole",
              value: "色付きロールを簡単に作成します"
            },
            {
              name: "/ticket",
              value: "簡易的なお問合せ(チケット)機能が使えます"
            },
            {
              name: "/slowmode",
              value: "チャンネルに低速モードを設定します"
            },
            {
              name: "/moderate",
              value: "モデレート機能を設定します"
            },
            {
              name: "/setting",
              value: "サーバーの各種設定を変更します\n詳しくは`/setting help`を実行してください"
            },
            {
              name: "/export",
              value: "サーバーのデータをJSON形式に出力します"
            }
          ]
        }],
        components:[
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("前")
                .setCustomId(`page_2_${id[2]}`))
            .addComponents(
              new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("3ページ")
                .setCustomId("page")
                .setDisabled(true))
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("次")
                .setCustomId(`page_4_${id[2]}`))
        ]
      })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async(error)=>{
        await err(interaction,error)
      })
    }
    //4ページ目
    if(interaction.customId.startsWith("page_4")){
      await interaction.message.edit({
        embeds:[{
          title: "HELP エンタメ・BOT系",
          color: "GREEN",
          fields:[
            {
              name: "/mc",
              value: "指定したアドレスのMinecarftサーバーの情報を表示します"
            },
            {
              name: "/miq",
              value: "Make it a Quoteを生成します"
            },
            {
              name: "/5000",
              value: "5000兆円ジェネレーター"
            },
            {
              name: "/faq",
              value: "よくある質問一覧を表示します"
            },
            {
              name: "/ad",
              value: "BOTの広告文を表示します"
            },
            {
              name: "/cipher",
              value: "文字列の暗号化、復号化します"
            },
            {
              name: "/sha256",
              value: "SHA256でテキストをハッシュ化します"
            },
            {
              name: "/status",
              value: "BOTのサーバーの状態を表示します\n※異常かもと思った場合は、早急に報告してください"
            },
            {
              name: "/about",
              value: "BOTについての情報や、関連リンクを表示します"
            },
            {
              name: "/news",
              value: "最近のニュースを表示します"
            },
            {
              name: "/account",
              value: "登録されているアカウント情報を表示します"
            }
          ]
        }],
        components:[
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("前")
                .setCustomId(`page_3_${id[2]}`))
            .addComponents(
              new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("4ページ")
                .setCustomId("page")
                .setDisabled(true))
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("次")
                .setCustomId(`page_5_${id[2]}`))
        ]
      })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async(error)=>{
        await err(interaction,error)
      })
    }

    if(interaction.customId.startsWith("page_5")){
      await interaction.message.edit({
        embeds:[{
          title: "HELP 雑用系",
          color: "GREEN",
          fields:[
            {
              name: "/top",
              value: "実行したチャンネルの1番最初のメッセージを表示します"
            },    
            {
              name: "/safeweb",
              value: "Webサイトの安全性を評価します"
            },
            {
              name: "/webshot",
              value: "Webサイトのスクリーンショットを撮影します"
            },
            {
              name: "/afk",
              value: "AFKを設定します(留守電の機能です)"
            },
            {
              name: "/npm",
              value: "NPMパッケージを検索、表示します"
            },
            {
              name: "/pypi",
              value: "PIPパッケージを検索、表示します"
            },
            {
              name: "/omikuji",
              value: "大吉や、凶、吉などのおみくじが引けます"
            },
            {
              name: "/script",
              value: "プログラムを実行します"
            },
            {
              name: "/qr",
              value: "QRコードを生成、または読み取ります"
            },
            {
              name: "/follow",
              value: "BOTのアナウンスチャンネルを追加します"
            },
            {
              name: "/invite",
              value: "カスタマイズされた招待リンクを作成します"
            },
            {
              name: "/snowflake",
              value: "[Snowflake](https://discord.com/developers/docs/reference#snowflakes)を解析します"
            }
          ]
        }],
        components:[
          new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("前")
                .setCustomId(`page_4_${id[2]}`))
            .addComponents(
              new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("5ページ")
                .setCustomId("page")
                .setDisabled(true))
            .addComponents(
              new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("次")
                .setCustomId(`page_1_${id[2]}`))
        ]
      })
      .then(async()=>{
        await interaction.deferUpdate({});
      })
      .catch(async(error)=>{
        await err(interaction,error)
      })
    }
  }
}

async function check(interaction,id){
  if(id !== interaction.user.id){
    await interaction.reply({
      embeds:[{
        author:{
          name: "ページを更新できませんでした",
          icon_url: "https://cdn.taka.ml/images/system/error.png"
        },
        color: "RED",
        description: "このコマンドは別の人が操作しています"
      }],
      ephemeral: true
    });
    return true
  }
  return false
}

async function err(interaction,error){
  const { MessageButton, MessageActionRow } = require("discord.js");
  
  await interaction.reply({
    embeds:[{
      author:{
        name: "ページを更新できませんでした",
        icon_url: "https://cdn.taka.ml/images/system/error.png"
      },
      color: "RED",
      description: "BOTの権限が不足しています",
      fields:[
        {
          name: "エラーコード",
          value: `\`\`\`${error}\`\`\``
        }
      ]
    }],
    components:[
      new MessageActionRow()
        .addComponents( 
          new MessageButton()
            .setLabel("サポートサーバー")
            .setURL("https://discord.gg/NEesRdGQwD")
            .setStyle("LINK"))
    ],
    ephemeral: true
  });
}