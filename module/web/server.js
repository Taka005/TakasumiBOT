module.exports = async(client)=>{
  const express = require("express");
  const app = express();
  const os = require("os");
  const fs = require("fs");
  const https = require("https");
  const date = require("../../data/api.json");

  try{
    const options = {
      key: fs.readFileSync( "/home/taka/discordbot/ssl/server.key" ),
      cert: fs.readFileSync( "/home/taka/discordbot/ssl/server.pem" )
    };
    const server = https.createServer(options,app);

    server.listen(443, () => console.info(`\x1b[34mINFO: WEB(https)サーバーが正常に起動しました`));
  }catch{
    console.warn(`\x1b[33mWARN:sslを使用せずに起動しました`)
  }

  app.listen(80, () => console.info(`\x1b[34mINFO: WEB(http)サーバーが正常に起動しました`));
   
  app.get("/", (req, res) =>{
    res.redirect("https://taka.ml/");
    console.info(`\x1b[34mINFO: [${req.ip}]からtaka.mlにリダイレクト`);
    res.end()
  });

  //------リダイレクト------//
  app.get("/support", (req, res) =>{
    res.redirect("https://discord.gg/GPs3npB63m");
    console.info(`\x1b[34mINFO: [${req.ip}]からsupportにリダイレクト`);
    res.end()
  });

  app.get("/invite", (req, res) =>{
    res.redirect("https://discord.com/oauth2/authorize?client_id=981314695543783484&permissions=4398046511095&scope=bot%20applications.commands");
    console.info(`\x1b[34mINFO: [${req.ip}]からinviteにリダイレクト`);
    res.end()
  });

  app.get("/feedback", (req, res) =>{
    res.redirect("https://forms.gle/qe17jt8XnURTv5Pe8");
    console.info(`\x1b[34mINFO: [${req.ip}]からinviteにリダイレクト`);
    res.end()
  });
  //------リダイレクト------//

  //------API------//
  app.get("/v1/status", (req, res) =>{
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
    
    console.info(`\x1b[34mINFO: [${req.ip}]からAPIにリクエスト`)
    res.end()
  });

  app.get("/v1/date", (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(date);

    console.info(`\x1b[34INFO: [${req.ip}]からAPIにリクエスト`)
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