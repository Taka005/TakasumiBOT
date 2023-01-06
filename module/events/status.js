module.exports = async(client)=>{
  const package = require("../../package.json");

  let stats = 0; 
  setInterval(()=>{
    if(stats === 0){
      client.user.setActivity(`/help || ping:${client.ws.ping}ms`, {
        type: "PLAYING"
      });
      stats = 1;
    }else if(stats === 1){
      client.user.setActivity(`taka.ml || ver:${package.version}`, {
        type: "PLAYING"
      });
      stats = 2; 
    }else if(stats === 2){
      client.user.setActivity(`${client.guilds.cache.size}server || ${client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)}user`,{
        type: "PLAYING"
      });
      stats = 0;
    }
  },6000)

  client.channels.cache.get("947484748773736538").send("BOT、APIサーバーが再起動されました");

  console.log(`\x1b[32m    Account ${client.user.tag}  `);
  console.log(`\x1b[34m    User:${client.guilds.cache.size} Server:${client.guilds.cache.map((g)=>g.memberCount).reduce((a,c)=>a+c)}`)
}