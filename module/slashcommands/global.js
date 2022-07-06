async function global(interaction){
  const main = require("../../data/global/main.json");
  const fs = require("fs");
  const { WebhookClient } = require('discord.js');
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "global"){
      if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーの\n`チャンネルを管理`の権限を持っている必要があります"
        }],
        ephemeral:true
      });

    if (!interaction.channel.permissionsFor(interaction.guild.me).has("MANAGE_WEBHOOKS")) return await interaction.reply({
      embeds:[{
        author: {
          name: "BOTに権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドは、BOTに`webhookの管理`の権限が必要です\n何度も失敗する場合は[サポートサーバー](https://discord.gg/GPs3npB63m)まで、ご報告ください"
      }],
      ephemeral:true
    });

    if(main[interaction.channel.id]){
      const webhooks = new WebhookClient({id: main[interaction.channel.id][0], token: main[interaction.channel.id][1]});
      await webhooks.delete()
        .then(()=>{
          delete main[interaction.channel.id];

          fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
          interaction.reply({
            content:`${interaction.member}`,
            embeds:[{
              author: {
                name: "登録の削除が完了しました",
                icon_url: "https://taka.ml/images/success.png",
              },
              color: "GREEN"
            }]
          });
        })
        .catch(()=>{
          interaction.reply({
            embeds:[{
              author: {
                name: "既に削除済みです",
                icon_url: "https://taka.ml/images/error.jpg",
              },
              color: "RED"
            }],
            ephemeral:true
          })
        });
      return delete require.cache[require.resolve("../../data/global/main.json")];
    }

    await interaction.channel.createWebhook("TakasumiBOT",{
      avatar: "https://taka.ml/images/bot.png",
    })
      .then(async (webhook) =>{
        main[interaction.channel.id] = [webhook.id,webhook.token,interaction.guild.id];

        fs.writeFileSync("./data/global/main.json", JSON.stringify(main), "utf8");
        Object.keys(main).forEach(async (channels) => {
          const webhooks = new WebhookClient({id: main[channels][0], token: main[channels][1]});
          await webhooks.send({
            embeds:[{
              color: "WHITE",
              author: {
                name: `${interaction.guild.name}<${interaction.guild.id}>`,
                icon_url: interaction.guild.iconURL()
              },
              description: `グローバルチャットに新しいサーバーが参加しました！\n みんなで挨拶してみましょう！\n\n※チャットを利用した場合、[利用規約](http://taka.ml/bot/takasumi.html)に同意されたことになります。必ずご確認ください`,
              timestamp: new Date()
            }]
          }).catch(()=>{})
        });
        
        interaction.deferReply()
          .then(()=>interaction.deleteReply());
      })
      .catch(()=>{
        interaction.reply({
          embeds:[{
            author: {
              name: "作成に失敗しました",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: `\`\`\`${error}\`\`\`\n[サポートサーバー](https://discord.gg/GPs3npB63m)`
          }],
          ephemeral:true
        })
      });
      delete require.cache[require.resolve("../../data/global/main.json")];

    return;
  }
}
  
module.exports = global