async function server(client){
  const express = require('express');
  const app = express();
  const os = require("os");
  const fs = require("fs");
  require("dotenv").config();

  let time = new Date(); 
  app.listen(80, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: APIサーバーが起動しました`));
   
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

  app.get('/api/url', (req, res) =>{
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からAPIにリクエスト`);

    if(!req.query.url||!req.query.name||!req.query.key) return res.json({url:"lack of properties"});
    if(req.query.key !== process.env.URL_KEY) return res.json({url:"mistake key"});
    if(fs.statSync(`./url/${req.query.name}.json`)) return res.json({url:"url is used"});
      try{
        fs.writeFileSync(`./url/${req.query.name}.json`, `{"url":${req.query.url}}`, 'utf8');
      }catch{
        return res.json({url:"server error"});
      }
      res.json({url:`http://takabot.f5.si/url/${req.query.name}`})
    res.end()
  });
  //------API------//

  //------短縮URL------//
  app.get('/url/:name', (req, res) =>{
    const file = require(`../../url/${req.params.name}.json`);
    if(!file) return res.send(`<h1>NOT REGISTERED</h1>`);
    res.redirect(file.url);
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