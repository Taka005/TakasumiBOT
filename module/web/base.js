function base(client,express,app){

  let time = new Date(); 

  app.listen(3000, () => console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: APIサーバーが起動しました`));

  app.use(`/`, express.static("./module/web/assets"));
    
  app.get('/',(req,res) =>{
    let time = new Date();
    res.sendStatus(200);
    console.info(`\x1b[34m[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]INFO: [${req.ip}]からAPIにリクエストがありました`)
  });

  const status = require("./status");
  status(client,express,app);

}

module.export = base