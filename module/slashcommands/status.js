async function status(interaction,client){
  const os = require('os');
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
    use = 100 - Math.round(cpu)

    interaction.reply({
      embeds:[{
        title: "ステータス",
        color: "BLUE",
        timestamp: new Date(),
        fields: [
        {
        name: "**Discord**",
        value: `${client.ws.ping}ミリ秒`
        },
        {
          name: "**システム情報**",
          value: `${system[0].model}\n${os.type()} ${os.arch()}`
        },
        {
        name: "**システム使用率**",
        value: `**CPU**\n${use}％\n**メモリー**\n${ramuse}MB / ${ramtotal}MB ${rampercent}％\n`
        },
        {
        name: "**起動時間**",
        value: `プロセス:${Math.round(process.uptime() / 60)}分\nサーバー:${Math.round(os.uptime() / 60)}分`
        }
      ]
      }]}
    )
    return;
  }
}
    
module.exports = status