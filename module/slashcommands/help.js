async function help(interaction){
  const {MessageButton, MessageActionRow} = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "help"){

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

    await interaction.reply({
      embeds:[{
        title: "HELP 便利系",
        description: "※ただいま移行中のため、スラッシュコマンドのみ表示しています",
        color: "GREEN",
        fields: [
          {
            name: "**/poll**",
            value: "アンケートを作成することができます\n最大で選択肢は12個までです"
          },
          {
            name: "**/global**",
            value: "色々なサーバーと繋がるグローバルチャットを有効、無効にします\n[利用規約](https://taka.ml/bot/takasumi.html)を読んでから使用してください"
          },
          {
            name: "**/gif**",
            value: "GIF画像を検索し、表示します"
          },
          {
            name: "**/del**",
            value: "指定された数だけ、メッセージを一括で削除します\n ※二週間前のメッセージは削除できません、\nまたこれを実行するには、`メッセージを管理`の権限が必要です"
          },
          {
            name: "**/embed**",
            value: "埋め込みを簡単に作成し、表示できます\n※この機能は今のままでも十分使えますが、\nまだ開発中のため機能が増える可能性があります"
          },
          {
            name: "**/say**",
            value: "BOTに好きな発言をさせることが可能です\n※メンション等は発言できません\nまた、この機能によっての発言内容については、運営は責任を負いません"
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