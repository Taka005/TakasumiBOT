async function base(client){
  const express = require('express');
  const app = express();
  const os = require("os");

  let time = new Date(); 
  app.listen(80, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: APIサーバーが起動しました`));
   
  app.use(`/`, express.static("./module/web/assets"));
  
  //------リダイレクト------//
  app.get('/support', (req, res) =>{
    res.redirect("https://discord.gg/GPs3npB63m");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からsupportにリダイレクト`);
  });

  app.get('/invite', (req, res) =>{
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=981314695543783484&permissions=1644971949559&scope=bot%20applications.commands");
    let time = new Date();
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からinviteにリダイレクト`);
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
  });

  //------API------//

  //------ERROR処理------//
  app.use((req, res, next)=>{
    res.status(404).send(`<h1>404 NOT FOUND</h1><br>[${req.path}]`);
  });

  app.use(function(err, req, res, next){
    res.status(500).send(`<h1>500 SERVER ERROR</h1><br>[${err}]`);
  });
  //------ERROR------
}

module.exports = base