async function help(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "help"){
    const before = new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("前")
      .setCustomId("before")

    const next = new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("次")
      .setCustomId("next")

    const page = new MessageButton()
      .setStyle("SECONDARY")
      .setLabel("1ページ")
      .setCustomId("page")
      .setDisabled(true)

    await interaction.deferReply({
      embeds:[{
        title: "BOTのHELP",
        description: "製作者:Taka005#1203\nプレフィックスは`>`または`/`です",
        color: "RED",
        footer: {
          text: "サポートサーバー\n  https://discord.gg/GPs3npB63m"
        },
        fields: [
          {
            name: "**/status**",
            value: "BOTのステータスを表示します"
          },
          {
            name: "**/say**",
            value: "BOTにメッセージを表示させます\n※稀に自分の送信したメッセージが消えないことがありますが他の人には見えていないので大丈夫です"
          },
          {
            name:"**/auth**",
            value:"簡易的な認証機能が使えます"
          },
          {
            name:"**/panel**",
            value:"/authよりも強力な認証機能が使えます"
          },
          {
            name:"**>global**",
            value:"グローバルチャットに接続します。\n切断したい時はもう一回実行してください\n※他のグローバルチャットと競合する可能性があります"
          },
          {
            name:"**/ticket**",
            value:"簡単なチケット機能を使えます"
          },
          {
            name: "**>timer**",
            value: ">timer [second]で時間を秒単位で測れます\n※あまりに長い時間は設定しないでください"
          },
          {
            name: "**/gif**",
            value: "GIF画像を検索します"
          },
          {
            name: "**/poll**",
            value: "アンケート機能です"
          },
          {
            name: "**/draw**",
            value: "おみくじを引くことができます。運勢を確かめよう！"
          },
          {
            name: "**><help**",
            value: "メモ機能のHELPを表示する"
          },
          {
            name: "**/avatar**",
            value: "自分のアイコン又は、引数にユーザーIDを入れることでアイコンを取得します"
          },
          {
            name: "**>soccer**",
            value: "サッカーをします"
          },
          {
            name: "**/user**",
            value: "自分のアカウント又は、指定したユーザーを取得します"
          },
          {
            name: "**/server**",
            value: "サーバーの情報を取得します"
          },
          {
            name: "**>cpu**",
            value: "様々なCPUがランダムで出てきます"
          },
          {
            name: "**>url**",
            value: ">url [ファイルURL]でBOTにファイルを送信させます"
          },
          {
            name: "**/channel**",
            value: "指定したチャンネルにメッセージを送信できます**"
          },
          {
            name: "**/del**",
            value: "メッセージを一括で削除できます\n**※二週間以上前のメッセージは削除できません。**"
          },
          {
            name: "**>exec**",
            value: "制作者専用です"
          }
      ]}],
      components: [
        new MessageActionRow()
          .addComponents(before)
          .addComponents(page)
          .addComponents(next)
      ]
    });
    return;
  }
};

module.exports = help