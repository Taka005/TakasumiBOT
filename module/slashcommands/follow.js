module.exports = async(interaction,client)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "follow"){

    if(
      !interaction.member.permissions.has("MANAGE_MESSAGES")||
      !interaction.member.permissions.has("MANAGE_CHANNELS")
    ) return interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーで以下の権限を持っている必要があります\n```メッセージを管理\nチャンネルの管理```"
      }],
      ephemeral:true
    });
 
    if(!interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_CHANNELS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.ml/images/error.png",
        },
        color: "RED",
        description: "この機能は、BOTに以下の権限が必要です\n```チャンネルの管理```\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
      }],
      ephemeral:true
    });

    const ch = await client.channels.cache.get("942269941430763550");
  
    await ch.addFollower(interaction.channel, "TakasumiBOTアナウンス")
      .then(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: `アナウンスチャンネルを追加しました`,
              icon_url: "https://cdn.taka.ml/images/success.png",
            },
            description:"このチャンネルでBOTをお知らせ等を受け取ることができます",
            color: "GREEN"
          }]
        })
      })
      .catch((error)=>{
        interaction.reply({
            embeds:[{
              author: {
                name: "フォローチャンネルを追加できませんでした",
                icon_url: "https://cdn.taka.ml/images/error.png",
              },
              color: "RED",
              fields: [
                {
                  name: "エラーコード",
                  value: `\`\`\`${error}\`\`\``
                }
              ]
            }],
            ephemeral:true
        });
      })
  }
}