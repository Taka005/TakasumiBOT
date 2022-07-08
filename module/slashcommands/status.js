async function status(interaction,client){
  const os = require('os');
  const global = require("../../data/global/main.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "status"){
    const ramfree = Math.round(os.freemem / 1000000);
    const ramtotal = Math.round(os.totalmem / 1000000);
    const ramuse = ramtotal - ramfree
    const rampercent = Math.round(ramuse / ramtotal * 100)

    const system = os.cpus()
    let cpu = 0;
    system.forEach(system => {
        let total = 0;
        for(let type in system.times){
            total += system.times[type];
        }
        cpu += (1 - (system.times["idle"] / total))* 100;
    });
    
    const chat = Object.keys(global).length/client.guilds.cache.size*100

    interaction.reply({
      embeds:[{
        title: "ステータス",
        color: "BLUE",
        timestamp: new Date(),
        fields: [
        {
        name: "**Discord**",
        value: `${client.ws.ping}ミリ秒\n\nグローバルチャット登録数\n${Object.keys(global).length} / ${client.guilds.cache.size} (${chat}%)`
        },
        {
          name: "**システム情報**",
          value: `${system[0].model}\n${os.type()} ${os.arch()}`
        },
        {
        name: "**システム使用率**",
        value: `**CPU**\n${Math.round(cpu)}％\n**メモリー**\n${ramuse}MB / ${ramtotal}MB ${rampercent}％\n`
        },
        {
        name: "**起動時間**",
        value: `プロセス:${Math.round(process.uptime() / 60)}分\nサーバー:${Math.round(os.uptime() / 60)}分`
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