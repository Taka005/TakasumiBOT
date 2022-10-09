async function gateway(){
  const zlib = require("zlib");
  const ws = require("ws");
  require("dotenv").config();
  const connect = require("./connect");

  function websocket(){
    const Client = new ws("wss://ugc.renorari.net/api/v1/gateway");

    Client.on("close", (code, reason)=>{
      setTimeout(() =>{
        websocket();
      }, 10000);
      return console.info(`\x1b[33mUGC:CLOSE ${code}:${reason}`); 
    });
    
    Client.on("error", (error)=>{
      return console.info(`\x1b[31mUGC:ERROR ${error}`); 
    });

    Client.on("message", (rawData)=>{

      zlib.inflate(rawData, (err,_data) =>{
        if(err) return console.log(`\x1b[31mUGC:ERROR ${err}`);
        let data = JSON.parse(_data);
        if(data.type === "hello"){
          Client.send(zlib.deflateSync(JSON.stringify({
            "type": "identify",
            "data": {
              "token": process.env.UGC_KEY
            }
            }),(err)=>{
              if(err) return console.info(`\x1b[31mUGC:ERROR ${err}`); 
            }
          ));
        }else if(data.type === "message"){
          const msg = data.data.data
          return connect(msg);

        }else if(data.type === "identify"){
          if(!data.success) return console.info(`\x1b[31mUGC:ERROR No Ready`); 
          return console.info(`\x1b[34mUGC:READY!`); 

        }else if(data.type === "heartbeat"){
          return 0;
        }
      });
    });
  }
  websocket()
}

module.exports = gateway