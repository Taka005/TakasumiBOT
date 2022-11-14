module.exports = async(interaction,client)=>{
  const os = require("os");
  const fetch = require("node-fetch");
  const global = require("../../data/global/main.json");
  const hiroyuki = require("../../data/hiroyuki/main.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "status"){

    await interaction.deferReply();
    await interaction.editReply({
      embeds:[{
        color: "BLUE",
        description: "計測中...",
        timestamp: new Date(),
      }]
    });

    const cpuusage = await new Promise((resolve) =>
      require("os-utils").cpuUsage(resolve)
    );

    const members = await fetch("https://auth.taka.ml/data/user.json")
      .then(res=>res.json())
      .catch(()=>{})
    
    const chat = Object.keys(global).length/client.guilds.cache.size*100

    const start = performance.now(); 
    await fetch("https://api.taka.ml/v1/status")
      .catch(()=>{})
    const end = performance.now(); 

    await interaction.editReply({
      embeds:[{
        color: "BLUE",
        title: "ステータス",
        timestamp: new Date(),
        fields: [
          {
            name: "API",
            value: `Ping:${Math.floor(end - start)}㍉秒`
          },
          {
            name: "システム",
            value: `OS: ${os.version()}(${os.type()}) ${os.arch()}\nCPU(${os.cpus()[0].model}): ${(cpuusage * 100).toFixed(2)}%\nMemory: ${100 - Math.floor((os.freemem() / os.totalmem()) * 100)}%`
          },
          {
            name: "Discord",
            value: `Ping:${client.ws.ping}㍉秒\nGC登録数: ${Object.keys(global).length} / ${client.guilds.cache.size} (${Math.round(chat)}%)\nひろゆき登録数: ${Object.keys(hiroyuki).length}\nTakasumiBOT Members: ${Object.keys(members).length}人\nServer Uptime: ${Math.round(os.uptime() / 60)}分(BOT: ${Math.round(process.uptime() / 60)}分)`
          }
        ]
      }]
    }).catch((error)=>{
      interaction.editReply({
        embeds:[{
          author: {
            name: "正常に送信できませんでした",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
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
      })
    });
  }
}