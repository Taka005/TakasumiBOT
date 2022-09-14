async function status(interaction,client){
  const os = require('os');
  const global = require("../../data/global/main.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "status"){

    const cpuusage = await new Promise((resolve) =>
      require("os-utils").cpuUsage(resolve)
    );
    
    const chat = Object.keys(global).length/client.guilds.cache.size*100

    interaction.reply({
      embeds:[{
        color: "BLUE",
        timestamp: new Date(),
        fields: [
        {
          name: "Status",
          value: `OS: ${os.version()}(${os.type()}-${os.platform()}) ${os.arch()}\nCPU(${os.cpus()[0].model}): ${cpuusage}%\nMemory: ${100 - Math.floor((os.freemem() / os.totalmem()) * 100)}%\n`
        },
        {
        name: "Discord",
        value: `Ping:${client.ws.ping}㍉秒\nGC登録数:${Object.keys(global).length} / ${client.guilds.cache.size} (${Math.round(chat)}%)\nServer Uptime: ${Math.round(os.uptime() / 60)}分(BOT: ${Math.round(process.uptime() / 60)}分)`
        }
      ]
      }]}
    ).catch((error)=>interaction.reply({
      embeds:[{
        author: {
          name: "正常に送信できませんでした",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: `\`\`\`${error}\`\`\`\n[サポートサーバー](https://discord.gg/GPs3npB63m)`
      }],
      ephemeral:true
    }));
    return;
  }
}
    
module.exports = status