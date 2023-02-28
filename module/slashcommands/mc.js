module.exports = async(interaction)=>{
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "mc"){
    const ip = interaction.options.getString("ip");
    const edition = interaction.options.getString("edition");

    await interaction.deferReply();
    if(edition === "je"){
      const server = await fetch(`https://api.mcsrvstat.us/2/${encodeURIComponent(ip)}`)
        .then(res=>res.json())
        .catch(()=>{})

      if(!server.debug.ping&&!server.online) return await interaction.editReply({
        embeds:[{
          author:{
            name: "取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "無効なホスト名です"
        }]
      });

      try{
        if(server.online){
          await interaction.editReply({
            embeds:[{
              title: ip,
              url: `https://mcsrvstat.us/server/${ip}`,
              color: "GREEN",
              thumbnail:{
                url: `https://api.mcsrvstat.us/icon/${ip}`,
              },
              description: ":green_circle: オンライン",
              fields:[
                {
                  name: "MOTD",
                  value: `\`\`\`${(server.motd)?server.motd.clean.join("\n"):"なし"}\`\`\``,
                  inline: true
                },
                {
                  name: "プレイヤー",
                  value: `${server.players.online}/${server.players.max}`,
                  inline: true
                },
                {
                  name: "バージョン",
                  value: server.version,
                  inline: true
                },
                {
                  name: "IPアドレス",
                  value: `${server.ip}:${server.port}`,
                  inline: true
                }
              ],
              timestamp: new Date(),
              footer:{
                text: "TakasumiBOT"
              }
            }]
          });
        }else{
          await interaction.editReply({
            embeds:[{
              title: ip,
              url: `https://mcsrvstat.us/server/${ip}`,
              color: "GREEN",
              thumbnail:{
                url: `https://api.mcsrvstat.us/icon/${ip}`,
              },
              description: "red_circle: オフライン",
              timestamp: new Date(),
              footer:{
                text: "TakasumiBOT"
              }
            }]
          });
        }
      }catch{
        await interaction.editReply({
          embeds:[{
            author:{
              name: "検索内容を取得できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "指定したアドレスが間違っている可能性があります"
          }]
        });
      }
    }else{
      const server = await fetch(`https://api.mcsrvstat.us/bedrock/2/${encodeURIComponent(ip)}`)
        .then(res=>res.json())
        .catch(()=>{})

      if(!server.debug.ping&&!server.online) return await interaction.editReply({
        embeds:[{
          author:{
            name: "取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          description: "無効なホスト名です"
        }]
      });

      try{
        if(server.online){
          await interaction.editReply({
            embeds:[{
              title: ip,
              url: `https://mcsrvstat.us/bedrock/${ip}`,
              color: "GREEN",
              thumbnail:{
                url: `https://api.mcsrvstat.us/icon/${ip}`,
              },
              description: ":green_circle: オンライン",
              fields:[
                {
                  name: "MOTD",
                  value: `\`\`\`${(server.motd) ? server.motd.clean.join("\n") : "なし"}\`\`\``,
                  inline: true
                },
                {
                  name: "プレイヤー",
                  value: `${server.players.online}/${server.players.max}`,
                  inline: true
                },
                {
                  name: "バージョン",
                  value: server.version,
                  inline: true
                },
                {
                  name: "IPアドレス",
                  value: `${server.ip}:${server.port}`,
                  inline: true
                },
                {
                  name: "ソフトウェア",
                  value: server.software,
                  inline: true
                }
              ],
              timestamp: new Date(),
              footer:{
                text: "TakasumiBOT"
              }
            }]
          });
        }else{
          await interaction.editReply({
            embeds:[{
              title: ip,
              url: `https://mcsrvstat.us/server/${ip}`,
              color: "GREEN",
              thumbnail:{
                url: `https://api.mcsrvstat.us/icon/${ip}`,
              },
              description: "red_circle: オフライン",
              timestamp: new Date(),
              footer:{
                text: "TakasumiBOT"
              }
            }]
          });
        }
      }catch{
        await interaction.editReply({
          embeds:[{
            author:{
              name: "検索内容を取得できませんでした",
              icon_url: "https://cdn.taka.ml/images/system/error.png"
            },
            color: "RED",
            description: "指定したアドレスが間違っている可能性があります"
          }]
        });
      }
    }
  }
}