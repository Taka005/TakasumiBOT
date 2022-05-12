async function help(interaction){
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'help') {
      await interaction.reply({
        embeds:[{
          title: "BOTのHELP",
          description: "製作者:Taka005#1203\n" +
                      "プレフィックスは`>`または`/`です",
          color: "RED",
          footer: {
            text: "サポートサーバー\n  https://discord.gg/GPs3npB63m"
          },
          fields: [
          {
            name: "**>status**",
            value: "BOTのステータスを表示します"
          },
          {
            name: "**>say**",
            value: ">say [text]でBOTにメッセージを表示させます\n※稀に自分の送信したメッセージが消えないことがありますが他の人には見えていないので大丈夫です"
          },
          {
            name: "**>timer**",
            value: ">timer [second]で時間を秒単位で測れます\n※あまりに長い時間は設定しないでください"
          },
          {
            name: "**>poll**",
            value: ">poll [title] [A] [B] ...と入力してアンケートが作れます"
          },
          {
            name: "**>draw**",
            value: "おみくじを引くことができます。運勢を確かめよう！"
          },
          {
            name: "**><help**",
            value: "メモ機能のHELPを表示する"
          },
          {
            name: "**>bans**",
            value: "サーバーからBANされた人を表示します"
          },
          {
            name: "**>avatar**",
            value: "自分のアイコン又は、引数にユーザーIDを入れることでアイコンを取得します"
            },
          {
            name: "**>join**",
            value: "自分がサーバーに参加している日数を表示します"
          },
          {
            name: "**>user**",
            value: "自分のアカウント又は、引数にユーザーIDを入れることでアカウントを取得します"
          },
          {
            name: "**>server**",
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
            name: "**ここからは管理者専用です**",
            value:"※使用には注意してください"
          },
          {
            name: "**>del**",
            value: ">dell [number]でメッセージを削除できます\n**※二週間以上前のメッセージは削除できません。**"
          },
          {
            name: "**>exec**",
            value: "制作者専用です"
          }
        ]
        }]}
      );
      return;
  }

};

module.exports = help