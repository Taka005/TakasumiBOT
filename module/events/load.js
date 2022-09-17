async function load(client){
  const api = require("../../data/api.json");
  const global = require("../../data/global/main.json");
  const fs = require("fs");
  const os = require("os");
  setInterval(async()=>{
    if(api.time.length > 100){
      api.ping.shift();
      api.time.shift();
      api.guild.shift(); 
      api.user.shift(); 
      api.gc.shift();
      api.cpu.shift();  
      api.ram.shift();
    }
    const cpuusage = await new Promise((resolve) =>
      require("os-utils").cpuUsage(resolve)
    );
    const time = new Date();

    api.time.push(`${time.getHours()}:${time.getMinutes()}`)
    api.ping.push(`${client.ws.ping}`)
    api.user.push(`${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}`)
    api.guild.push(`${client.guilds.cache.size}`)
    api.gc.push(`${Object.keys(global).length}`)
    api.cpu.push(`${(cpuusage * 100).toFixed(2)}`)
    api.ram.push(`${100 - Math.floor((os.freemem() / os.totalmem()) * 100)}`)
    
    fs.writeFileSync("./data/api.json", JSON.stringify(api), "utf8");
    delete require.cache[require.resolve("../../data/api.json")];
  },600000)
}

module.exports = load