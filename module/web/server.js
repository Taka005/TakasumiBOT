async function server(client){
  const express = require("express");
  const app = express();
  const os = require("os");
  const fs = require("fs");
  const https = require("https");
  const date = require("../../data/api.json");

  let time =new Date();
  try{
    const options = {
      key: fs.readFileSync( "/home/taka/discordbot/ssl/server.key" ),
      cert: fs.readFileSync( "/home/taka/discordbot/ssl/server.pem" )
    };
    const server = https.createServer(options,app);

    server.listen(443, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: WEB(https)サーバーが正常に起動しました`));
  }catch{
    console.warn(`\x1b[33m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]WARN:sslを使用せずに起動しました`)
  }

  app.listen(80, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: WEB(http)サーバーが正常に起動しました`));
   
  app.use(`/`, express.static("./module/web/assets"));
 
  //------リダイレクト------//
  app.get("/support", (req, res) =>{
    res.redirect("https://discord.gg/GPs3npB63m");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からsupportにリダイレクト`);
    res.end()
  });

  app.get("/invite", (req, res) =>{
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=981314695543783484&permissions=1644971949559&scope=bot%20applications.commands");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からinviteにリダイレクト`);
    res.end()
  });

  app.get("/feedback", (req, res) =>{
    res.redirect("https://forms.gle/qe17jt8XnURTv5Pe8");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からinviteにリダイレクト`);
    res.end()
  });
  //------リダイレクト------//

  //------API------//
  app.get("/api/status", (req, res) =>{
    let time = new Date();
    res.setHeader("Access-Control-Allow-Origin", "*")
         
    res.json({
      client:{
        bot:client.user.tag,
        ping:client.ws.ping,
        guild:client.guilds.cache.size,
        user:client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)
      },
      system:{
        ram:{   
          total:os.totalmem(),
          free:os.freemem(),
          use:os.totalmem() - os.freemem()
        },
        uptime:{
          os:os.uptime(),
          process:process.uptime()
        },
      },
      time:{
        hour:time.getHours(),
        minute:time.getMinutes(),
        second:time.getSeconds()
      }
    });
    
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からAPIにリクエスト`)
    res.end()
  });

  app.get("/api/date", (req, res) =>{
    let time = new Date();
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(date);

    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からAPIにリクエスト`)
    res.end()
  });

  app.get("/api/user", async (req, res) =>{
    let time = new Date();
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からAPIにリクエスト`);

    if(!req.query.id) return res.json({user:"error"});
      try{
        const user = await client.users.fetch(`${req.query.id}`);
        res.json({
          user:{
            name:user.username,
            discriminator:user.discriminator,
            tag:user.tag,
            id:user.id,
            avatar:user.avatarURL({"dynamic": true,"format": "png", "size": 512}),
            time:new Date(user.createdTimestamp).toLocaleDateString(),
            bot:user.bot,
            partial:user.partial,
            system:user.system,
            color:user.hexAccentColor
          }
        });
      }catch(error){
        res.json({user:`ERROR:${error}`})
      }
    res.end()
  });

  //------API------//

  //------ERROR処理------//
  app.use((req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(404).send(`<h1>404 NOT FOUND</h1><br>[${req.path}]`);
    res.end()
  });

  app.use(function(err, req, res){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(500).send(`<h1>500 SERVER ERROR</h1><br>[${err}]`);
    res.end()
  });
  //------ERROR------
}

module.exports = server