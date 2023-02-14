module.exports = async(interaction)=>{
    const main = require("../../data/hiroyuki/main.json");
    const sub = require("../../data/hiroyuki/sub.json");
    const fs = require("fs");
    const { WebhookClient, MessageButton, MessageActionRow } = require("discord.js");
    if(!interaction.isCommand()) return;
    if(interaction.commandName === "hiroyuki"){
  
      if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return await interaction.reply({
        embeds:[{
          author: {
            name: "権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "このコマンドを実行するには、あなたがこのサーバーの\n`チャンネルを管理`の権限を持っている必要があります"
        }],
        ephemeral:true
      });
  
      if(
        !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_WEBHOOKS")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("VIEW_CHANNEL")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")||
        !interaction.guild.me.permissionsIn(interaction.channel).has("MANAGE_CHANNELS")
      ) return await interaction.reply({
        embeds:[{
          author: {
            name: "BOTに権限がありません",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "ひろゆきの召喚は、BOTに以下の権限が必要です\n```テキストチャンネルの閲覧\nメッセージを送信\nウェブフックの管理\nチャンネルの管理```"
        }],
        ephemeral:true
      });
  
      if(sub[interaction.guild.id]){//登録済み
        const channel = sub[interaction.guild.id];
        const webhooks = new WebhookClient({id: main[channel][0], token: main[channel][1]});
        await webhooks.delete()
          .then(async()=>{
            delete main[channel];
            delete sub[interaction.guild.id];
            
            fs.writeFileSync("./data/hiroyuki/main.json", JSON.stringify(main), "utf8");
            fs.writeFileSync("./data/hiroyuki/sub.json", JSON.stringify(sub), "utf8");
  
            await interaction.reply({
              embeds:[{
                author: {
                  name: "ひろゆきの退出が完了しました",
                  icon_url: "https://cdn.taka.ml/images/system/success.png",
                },
                color: "GREEN"
              }]
            });
          })
          .catch(async()=>{
            delete main[channel];
            delete sub[interaction.guild.id];

            fs.writeFileSync("./data/hiroyuki/main.json", JSON.stringify(main), "utf8");
            fs.writeFileSync("./data/hiroyuki/sub.json", JSON.stringify(sub), "utf8");
  
            await interaction.reply({
              embeds:[{
                author: {
                  name: "ひろゆきの退出が完了しました",
                  icon_url: "https://cdn.taka.ml/images/system/success.png",
                },
                description: "※webhookは既に削除済みのため、\n登録情報のみ削除しました",
                color: "GREEN"
              }]
            })
          });
  
        delete require.cache[require.resolve("../../data/hiroyuki/sub.json")];
        delete require.cache[require.resolve("../../data/hiroyuki/main.json")];
      }else{//登録なし
        await interaction.deferReply();
        await interaction.channel.createWebhook("ひろゆき",{
          avatar: "https://cdn.taka.ml/images/hiroyuki.png",
        })
          .then(async(webhook)=>{
            main[interaction.channel.id] = [webhook.id,webhook.token,interaction.guild.id];
            sub[interaction.guild.id] = interaction.channel.id;
            fs.writeFileSync("./data/hiroyuki/main.json", JSON.stringify(main), "utf8");
            fs.writeFileSync("./data/hiroyuki/sub.json", JSON.stringify(sub), "utf8");

            await interaction.editReply({
              embeds:[{
                color: "GREEN",
                author: {
                  name: "ひろゆきの召喚に成功しました",
                  icon_url: "https://cdn.taka.ml/images/system/success.png"
                }
              }]
            });
          })
          .catch(async(error)=>{
            await interaction.editReply({
              embeds:[{
                author: {
                  name: "ひろゆきの召喚に失敗しました",
                  icon_url: "https://cdn.taka.ml/images/system/error.png",
                },
                color: "RED",
                description: `BOTの権限が不足しているか,\n既にwebhookの作成回数が上限に達しています`,
                fields: [
                  {
                    name: "エラーコード",
                    value: `\`\`\`${error}\`\`\``
                  }
                ]
              }],
              components: [
                new MessageActionRow()
                  .addComponents( 
                    new MessageButton()
                      .setLabel("サポートサーバー")
                      .setURL("https://discord.gg/NEesRdGQwD")
                      .setStyle("LINK"))
              ]
            });
          });
  
        delete require.cache[require.resolve("../../data/hiroyuki/main.json")];
        delete require.cache[require.resolve("../../data/hiroyuki/sub.json")];
      }
  }
}