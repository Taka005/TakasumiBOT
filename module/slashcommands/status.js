module.exports = async(interaction,client)=>{
  const os = require("os");
  const fetch = require("node-fetch");
  const mysql = require("../lib/mysql");
  const hiroyuki = require("../../data/hiroyuki/main.json");
  const { MessageButton, MessageActionRow } = require("discord.js");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "status"){

    await interaction.deferReply();
    await interaction.editReply({
      embeds:[{
        color: "BLUE",
        description: "計測中...",
        timestamp: new Date()
      }]
    });

    const cpuusage = await new Promise((resolve) =>
      require("os-utils").cpuUsage(resolve)
    );

    const account = await mysql("SELECT * FROM account");
    const global = await mysql("SELECT * FROM global;");

    const chat = global.length/client.guilds.cache.size*100

    const start = performance.now(); 
    await fetch("https://api.taka.ml/v1/status");
    const end = performance.now(); 

    await interaction.editReply({
      embeds:[{
        color: "BLUE",
        title: "ステータス",
        timestamp: new Date(),
        fields:[
          {
            name: "API",
            value: `Ping: ${Math.floor(end - start)}㍉秒`
          },
          {
            name: "システム",
            value: `OS: ${os.version()}(${os.type()}) ${os.arch()}\nCPU: ${(cpuusage * 100).toFixed(2)}%\nMemory: ${100 - Math.floor((os.freemem() / os.totalmem()) * 100)}%`
          },
          {
            name: "Discord",
            value: `Ping: ${client.ws.ping}㍉秒\nGC登録数: ${global.length} / ${client.guilds.cache.size} (${Math.round(chat)}%)\nひろゆき登録数: ${Object.keys(hiroyuki).length}\nTakasumiBOT Account: ${account.length}人\nServer Uptime: ${Math.round(os.uptime() / 60)}分(BOT: ${Math.round(process.uptime() / 60)}分)`
          }
        ]
      }],
      components:[
        new MessageActionRow()
          .addComponents( 
            new MessageButton()
              .setLabel("サポートサーバー")
              .setURL("https://discord.gg/NEesRdGQwD")
              .setStyle("LINK"))
      ]
    }).catch((error)=>{
      interaction.editReply({
        embeds:[{
          author:{
            name: "取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png"
          },
          color: "RED",
          fields:[
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],     
        components:[
          new MessageActionRow()
            .addComponents( 
              new MessageButton()
                .setLabel("サポートサーバー")
                .setURL("https://discord.gg/NEesRdGQwD")
                .setStyle("LINK"))
        ],
        ephemeral: true
      })
    });
  }
}