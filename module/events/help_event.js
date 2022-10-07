async function help_event(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isButton()) return;
  //1ページ目
  if(interaction.customId === "page_1"){
    const before = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("前")
    .setCustomId("page_0")
    .setDisabled(true)

  const next = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("次")
    .setCustomId("page_2")

  const page = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("1ページ")
    .setCustomId("page")
    .setDisabled(true)

    interaction.message.edit({
        embeds:[{
          title: "HELP 便利系",
          color: "GREEN",
          fields: [
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
              value: "GIF画像を検索し、表示します"
            },
            {
              name: "/del",
              value: "指定された数だけ、メッセージを一括で削除します\n ※二週間前のメッセージは削除できません、\nまたこれを実行するには、`メッセージを管理`の権限が必要です"
            },
            {
              name: "/embed",
              value: "埋め込みを簡単に作成し、表示できます"
            },
            {
              name: "/wiki",
              value: "Wikipediaの検索をします"
            },
            {
              name: "/short",
              value: "短縮URLを作成します"
            }
        ]}],
        components: [
          new MessageActionRow()
            .addComponents(before)
            .addComponents(page)
            .addComponents(next)
        ]
      })

      interaction.deferUpdate({});
    return;
  }
  //2ページ目
  if(interaction.customId === "page_2"){
    const before = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("前")
    .setCustomId("page_1")

  const next = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("次")
    .setCustomId("page_3")

  const page = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("2ページ")
    .setCustomId("page")
    .setDisabled(true)

    interaction.message.edit({
        embeds:[{
          title: "HELP 認証・情報系",
          color: "GREEN",
          fields: [
            {
              name: "/auth",
              value: "簡易的な、メンバー認証機能です\nボタンを押すことで認証ができます"
            },
            {
              name: "/panel",
              value: "強力なメンバー認証機能です\nボタンを押したら簡単な足し算を行うことで認証ができます"
            },
            {
              name: "/guideline",
              value: "サーバーのガイドラインを作成し、同意するとロールが付与されます"
            },
            {
              name: "/user",
              value: "指定されたユーザーを検索して、表示します\n検索対象がサーバー内にいる場合は、詳しい情報まで取得可能です"
            },
            {
              name: "/server",
              value: "実行したサーバーの情報を表示します"
            },
            {
              name: "/qr",
              value: "QRコードを生成、または読み取ります"
            },
            {
              name: "/avatar",
              value: "指定されたユーザーのアイコンを表示します\n使い方は`/user`と同じです"
            },
            {
              name: "/translate",
              value: "テキストを翻訳します"
            }
        ]}],
        components: [
          new MessageActionRow()
            .addComponents(before)
            .addComponents(page)
            .addComponents(next)
        ]
      })

      interaction.deferUpdate({});
    return;
  }
  //3ページ目
  if(interaction.customId === "page_3"){
    const before = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("前")
    .setCustomId("page_2")

  const next = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("次")
    .setCustomId("page_4")

  const page = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("3ページ")
    .setCustomId("page")
    .setDisabled(true)

    interaction.message.edit({
        embeds:[{
          title: "HELP サーバー管理系",
          color: "GREEN",
          fields: [
            {
              name: "/ban",
              value: "指定されたメンバーをサーバーからBANすることができます\n ※これを実行するには、`メンバーをBAN`の権限が必要です"
            },
            {
              name: "/kick",
              value: "指定されたメンバーをサーバーからKICKすることができます\n ※これを実行するには、`メンバーをKICK`の権限が必要です"
            },
            {
              name: "/channel",
              value: "指定されたチャンネルにメッセージを送信します\n ※これを実行するには、`メッセージを管理`の権限が必要です"
            },
            {
              name: "/role",
              value: "役職パネルを作成します\n ※これを実行するには、`ロールを管理`の権限が必要です"
            },
            {
              name: "/ticket",
              value: "簡易的なお問合せ(チケット)機能が使えます\n ※これを実行するには、`管理者`の権限が必要です"
            },
            {
              name: "/export",
              value: "サーバーのデータをJSON形式に出力します\n※情報の扱いには注意してください"
            }
        ]}],
        components: [
          new MessageActionRow()
            .addComponents(before)
            .addComponents(page)
            .addComponents(next)
        ]
      })

      interaction.deferUpdate({}) 
    return;
  }
  //4ページ目
  if(interaction.customId === "page_4"){
    const before = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("前")
    .setCustomId("page_3")

  const next = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("次")
    .setCustomId("page_5")
    .setDisabled(true)

  const page = new MessageButton()
    .setStyle("SECONDARY")
    .setLabel("4ページ")
    .setCustomId("page")
    .setDisabled(true)

    interaction.message.edit({
        embeds:[{
          title: "HELP エンタメ・BOT系",
          color: "GREEN",
          fields: [
            {
              name: "/mc",
              value: "指定したMinecarftサーバーの情報を表示します"
            },
            {
              name: "/cipher",
              value: "文字列の暗号化、復号化します"
            },
            {
              name: "/draw",
              value: "大吉や、凶、吉などのおみくじが引けます"
            },
            {
              name: "/status",
              value: "BOTのサーバーの状態を表示します\n※異常かもと思った場合は、早急に報告してください"
            },
            {
              name: "/invite",
              value: "BOTの招待リンク、サポートなどの情報を表示します"
            },
            {
              name: "/support",
              value: "サポートサーバーにバグや要望等を報告します\n※スパムや、悪質なものはおやめください"
            },
            {
              name: "/news",
              value: "最近のニュースを表示します"
            },
            {
              name: "/npm",
              value: "NPMパッケージを検索、表示します"
            }
        ]}],
        components: [
          new MessageActionRow()
            .addComponents(before)
            .addComponents(page)
            .addComponents(next)
        ]
      })

      interaction.deferUpdate({});
  }

}
    
module.exports = help_event