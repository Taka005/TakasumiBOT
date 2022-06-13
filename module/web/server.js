async function server(client){
  const express = require('express');
  const app = express();
  const os = require("os");
  const fs = require("fs");
  const https = require("https");
  const url = require("../../data/url.json");
  const ip = require("../../data/block_ip.json");

  const options = {
    key: fs.readFileSync( "/home/taka/discordbot/ssl/server.key" ),
    cert: fs.readFileSync( "/home/taka/discordbot/ss/server.crt" )
  };
  const server = https.createServer(options,app);

  let time = new Date(); 
  server.listen(443, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: WEB(https)サーバーが正常に起動しました`));
  app.listen(80, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: WEB(http)サーバーが正常に起動しました`));
   
  app.use(`/`, express.static("./module/web/assets"));
  
  //------リダイレクト------//
  app.get('/support', (req, res) =>{
    res.redirect("https://discord.gg/GPs3npB63m");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からsupportにリダイレクト`);
    res.end()
  });

  app.get('/invite', (req, res) =>{
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=981314695543783484&permissions=1644971949559&scope=bot%20applications.commands");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からinviteにリダイレクト`);
    res.end()
  });
  //------リダイレクト------//

  //------API------//
  app.get('/api/status', (req, res) =>{
    let time = new Date();
         
    res.json({
      client:{
        user:client.user.tag,
        ping:client.ws.ping
      },
      system:{
        ram:{   
          total:os.totalmem(),
          free:os.freemem(),
          use:os.totalmem() - os.freemem()
        },
        uptime:os.uptime()
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

  app.get('/api/user', async (req, res) =>{
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からAPIにリクエスト`);

    if(!req.query.id) return res.json({user:"error"});
      const user = await client.users.fetch(`${req.query.id}`);
      if(!user) return res.json({user:"error"});
      res.json({
        user:{
          name:user.username,
          discriminator:user.discriminator,
          tag:user.tag,
          id:user.id,
          avatar:user.avatarURL({format: 'png'}),
          bannar:user.bannerURL({format: 'png'}),
          time:new Date(user.createdTimestamp).toLocaleDateString(),
          bot:user.bot,
          partial:user.partial,
          system:user.system,
          color:user.hexAccentColor
        }
      });
    res.end()
  });

  //------API------//

  //------短縮URL------//
  app.get('/url/:name', (req, res) =>{
    if(!url[req.params.name]) return res.send(`<h1>NOT REGISTERED</h1>`);
    res.redirect(url[req.params.name]);
    res.end()
  });
  //------短縮URL------//

  //------ERROR処理------//
  app.use((req, res, next)=>{
    res.status(404).send(`<h1>404 NOT FOUND</h1><br>[${req.path}]`);
    res.end()
  });

  app.use(function(err, req, res, next){
    res.status(500).send(`<h1>500 SERVER ERROR</h1><br>[${err}]`);
    res.end()
  });
  //------ERROR------
}

module.exports = server