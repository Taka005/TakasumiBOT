async function user(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "user"){
    const user_id = await interaction.options.getString("id");
    const status_data = {
        "online": "🟢オンライン",
        "offline": "⚫オフライン",
        "dnd": "⛔取り込み中",
        "idle": "🌙退席中"
      };

      if(!user_id){
        const permissions = interaction.member.permissions.cache.map(permission=>{
          if( permission === "CREATE_INSTANT_INVITE") return "招待を作成";
          if( permission === "KICK_MEMBERS") return "メンバーをキック";
          if( permission === "BAN_MEMBERS") return "メンバーをBAN";
          if( permission === "ADMINISTRATOR") return "管理者";
          if( permission === "MANAGE_CHANNELS") return "チャンネルの管理";
          if( permission === "MANAGE_GUILD") return "サーバーの管理";
          if( permission === "ADD_REACTIONS") return "リアクションの追加";
          if( permission === "VIEW_AUDIT_LOG") return "監査ログを表示";
          if( permission === "PRIORITY_SPEAKER") return "優先スピーカー";
          if( permission === "STREAM") return"WEBカメラ";
          if( permission === "VIEW_CHANNEL") return "チャンネルを見る";
          if( permission === "SEND_MESSAGES") return "メッセージを送信";
          if( permission === "SEND_TTS_MESSAGES") return "TTSメッセージを送信";
          if( permission === "MANAGE_MESSAGES") return "メッセージの管理";
          if( permission === "EMBED_LINKS") return "埋め込みリンク";
          if( permission === "ATTACH_FILES") return "ファイルを添付";
          if( permission === "READ_MESSAGE_HISTORY") return "メッセージ履歴を見る";
          if( permission === "MENTION_EVERYONE") return "@everyone、@here、全てのロールにメンション";
          if( permission === "USE_EXTERNAL_EMOJIS") return "外部の絵文字を使用";
          if( permission === "VIEW_GUILD_INSIGHTS") return "サーバーインサイトを見る";
          if( permission === "CONNECT") return "接続";
          if( permission === "SPEAK") return "発言";
          if( permission === "MUTE_MEMBERS") return "メンバーをミュート";
          if( permission === "DEAFEN_MEMBERS") return "メンバーのスピーカーをミュート";
          if( permission === "MOVE_MEMBERS") return "メンバーを移動";
          if( permission === "USE_VAD") return "音声検出を使用";
          if( permission === "CHANGE_NICKNAME") return "ニックネームを変更";
          if( permission === "MANAGE_NICKNAMES") return "ニックネームの管理";
          if( permission === "MANAGE_ROLES") return "ロールの管理";
          if( permission === "MANAGE_WEBHOOKS") return "ウェブフックの管理";
          if( permission === "MANAGE_EMOJIS_AND_STICKERS") return "絵文字とステッカーの管理";
          if( permission === "USE_APPLICATION_COMMANDS") return "アプリケーションコマンドの使用";
          if( permission === "REQUEST_TO_SPEAK") return "スピーカー参加をリクエスト";
          if( permission === "MANAGE_THREADS") return "スレッドの管理";
          if( permission === "CREATE_PUBLIC_THREADS") return "公開スレッドの作成";
          if( permission === "CREATE_PRIVATE_THREADS") return "プライベートスレッドの作成";
          if( permission === "USE_EXTERNAL_STICKERS") return "外部のステッカーの使用";
          if( permission === "START_EMBEDDED_ACTIVITIES") return "アクティビティを開始";
          if( permission === "MODERATE_MEMBERS") return "メンバーをタイムアウト";
        });

        await interaction.reply({
          embeds:[{
            color: "WHITE",
            timestamp: new Date(),
            footer: {
              text: "TakasumiBOT"
            },
            thumbnail: {
              url: interaction.member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            fields: [
              {
                name: "**ユーザー名**",
                value: `${interaction.user.tag}`
              },
              {
                name: "**ID**",
                value: `${interaction.member.user.id}`,
                inline: true
              },
              {
                name: "**ニックネーム**",
                value: interaction.member.nickname||"未設定",
                inline: true
              },
              {
                name: "状態",
                value: `${status_data[interaction.member.presence?.status]||"取得不能"}`,
                inline: true
              },
              {
                name: "**作成日時**",
                value: `${new Date(interaction.member.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.member.user.createdAt) / 86400000)}日前)`,
                inline: true
              },
              {
                name:"**参加日時**",
                value: `${new Date(interaction.member.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - interaction.member.joinedAt) / 86400000)}日前)`,
                inline: true
              },
              {
                name: "アカウントの種類",
                value: interaction.user.bot ? "BOT" : "ユーザー",
                inline: true
              },
              {
                name:"**ロール**",
                value: `${interaction.member.roles.cache.map(r => r).join('')}`,
                inline: true
              },
              {
                name:"**権限**",
                value: `${permissions.join("|")}`,
                inline: true
              }
            ]
          }]
        });
        return;
      }
  
      const id = user_id.match(/\d{18}/g);
      if(!id) return await interaction.reply({
        embeds:[{
          author: {
            name: "取得に失敗しました",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "正確にIDまたは、メンションをしてください"
        }],
        ephemeral:true
      });
  
      const member = await interaction.guild.members.cache.get(id[0]);
        if(member){
          await interaction.reply({
            embeds:[{
              color: "WHITE",
              timestamp: new Date(),
              footer: {
                text: "TakasumiBOT"
              },
              thumbnail: {
                url: member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
              },
              fields: [
                {
                  name: "**ユーザー名**",
                  value: `${member.user.tag}`
                },
                {
                  name: "**ID**",
                  value: `${member.id}`,
                  inline: true
                },
                {
                  name: "**ニックネーム**",
                  value: member.nickname||"未設定",
                  inline: true
                },
                {
                  name: "状態",
                  value: `${status_data[member.presence?.status]||"取得不能"}`,
                  inline: true
                },
                {
                  name: "**作成日時**",
                  value: `${new Date(member.user.createdTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - member.user.createdAt) / 86400000)}日前)`,
                  inline: true
                },
                {
                  name:"**参加日時**",
                  value: `${new Date(member.joinedTimestamp).toLocaleDateString()}\n(${Math.round((Date.now() - member.joinedAt) / 86400000)}日前)`,
                  inline: true
                },
                {
                  name: "アカウントの種類",
                  value: member.user.bot ? "BOT" : "ユーザー",
                  inline: true
                },
                {
                  name:"**ロール**",
                  value: `${member.roles.cache.map(r => r).join('')}`,
                  inline: true
                }
              ]
            }]
          });
        }else{
          try{
            const users = await client.users.fetch(id[0]);
            await interaction.reply({
              embeds:[{
                color: "WHITE",
                timestamp: new Date(),
                footer: {
                  text: "TakasumiBOT"
                },
                thumbnail: {
                  url: users.avatarURL({ format: 'png', dynamic: true, size: 1024 }) || "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                fields: [
                  {
                    name: "**ユーザー名**",
                    value: `${users.tag}`,
                  },
                  {
                    name: "**ID**",
                    value: `${users.id}`,
                    inline: true
                  },
                  {
                    name: "**作成日時**",
                    value: `${new Date(users.createdTimestamp).toLocaleDateString()}`,
                    inline: true
                  },
                  {
                    name: "**アカウントの種類**",
                    value: users.bot ? "BOT" : "ユーザー",
                    inline: true
                  }
                ]
              }]
            });
          }catch{
            return await interaction.reply({
              embeds:[{
                author: {
                  name: "取得に失敗しました",
                  icon_url: "https://taka.ml/images/error.jpg",
                },
                color: "RED",
                description: "指定されたユーザーは存在しないか、\n間違っています"
              }],
              ephemeral:true
            });
          }
        }
    return;
  }
}
    
module.exports = user