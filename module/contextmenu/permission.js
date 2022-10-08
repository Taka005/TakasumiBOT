async function permission(interaction){
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "権限を表示"){
    const member = await interaction.options.getMember("user");

    try{
      const permissions = member.permissions.cache.map(p=>{
        if(p === "CREATE_INSTANT_INVITE") return "招待を作成";
        if(p === "KICK_MEMBERS") return "メンバーをキック";
        if(p === "BAN_MEMBERS") return "メンバーをBAN";
        if(p === "ADMINISTRATOR") return "管理者";
        if(p === "MANAGE_CHANNELS") return "チャンネルの管理";
        if(p === "MANAGE_GUILD") return "サーバーの管理";
        if(p === "ADD_REACTIONS") return "リアクションの追加";
        if(p === "VIEW_AUDIT_LOG") return "監査ログを表示";
        if(p === "PRIORITY_SPEAKER") return "優先スピーカー";
        if(p === "STREAM") return "WEBカメラ";
        if(p === "VIEW_CHANNEL") return "チャンネルを見る";
        if(p === "SEND_MESSAGES") return "メッセージを送信";
        if(p === "SEND_TTS_MESSAGES") return "TTSメッセージを送信";
        if(p === "MANAGE_MESSAGES") return "メッセージの管理";
        if(p === "EMBED_LINKS") return "埋め込みリンク";
        if(p === "ATTACH_FILES") return "ファイルを添付";
        if(p === "READ_MESSAGE_HISTORY") return "メッセージ履歴を見る";
        if(p === "MENTION_EVERYONE") return "@everyone、@here、全てのロールにメンション";
        if(p === "USE_EXTERNAL_EMOJIS") return "外部の絵文字を使用";
        if(p === "VIEW_GUILD_INSIGHTS") return "サーバーインサイトを見る";
        if(p === "CONNECT") return "接続";
        if(p === "SPEAK") return "発言";
        if(p === "MUTE_MEMBERS") return "メンバーをミュート";
        if(p === "DEAFEN_MEMBERS") return "メンバーのスピーカーをミュート";
        if(p === "MOVE_MEMBERS") return "メンバーを移動";
        if(p === "USE_VAD") return "音声検出を使用";
        if(p === "CHANGE_NICKNAME") return "ニックネームを変更";
        if(p === "MANAGE_NICKNAMES") return "ニックネームの管理";
        if(p === "MANAGE_ROLES") return "ロールの管理";
        if(p === "MANAGE_WEBHOOKS") return "ウェブフックの管理";
        if(p === "MANAGE_EMOJIS_AND_STICKERS") return "絵文字とステッカーの管理";
        if(p === "USE_APPLICATION_COMMANDS") return "アプリケーションコマンドの使用";
        if(p === "REQUEST_TO_SPEAK") return "スピーカー参加をリクエスト";
        if(p === "MANAGE_THREADS") return "スレッドの管理";
        if(p === "CREATE_PUBLIC_THREADS") return "公開スレッドの作成";
        if(p === "CREATE_PRIVATE_THREADS") return "プライベートスレッドの作成";
        if(p === "USE_EXTERNAL_STICKERS") return "外部のステッカーの使用";
        if(p === "START_EMBEDDED_ACTIVITIES") return "アクティビティを開始";
        if(p === "MODERATE_MEMBERS") return "メンバーをタイムアウト";
      });

      await interaction.reply({
        embeds:[{
          color: "GREEN",
          author: {
            name:`${member.user.tag}の権限`,
            url: `https://discord.com/users/${member.user.id}`,
            icon_url: "https://cdn.taka.ml/images/success.png"
          },
          timestamp: new Date(),
          footer: {
            text: "TakasumiBOT"
          },
          thumbnail: {
            url: member.user.avatarURL({ format: "png", dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          description:`\`\`\`${permissions.join("||")}\`\`\``
        }]
      })
    }catch(error){
      await interaction.reply({
        embeds:[{
          author: {
            name: "翻訳できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "翻訳文字を変えて、もう一度実行してください",
        }],
        ephemeral:true
      });
    }
  }
}

module.exports = permission