async function gateway(){
  const zlib = require("zlib");
  const ws = require("ws");
  require("dotenv").config();
  const connect = require("./connect");
  const websocket = new ws("wss://ugc.renorari.net/api/v1/gateway");

  websocket.on("close", (code, reason)=>{
    return console.info(`\x1b[33mUGC:CLOSE ${code}:${reason}`); 
  });
    
  websocket.on("error", (error)=>{
    return console.info(`\x1b[31mUGC:ERROR ${error}`); 
  });

  websocket.on("message", (rawData)=>{
    zlib.inflate(rawData, (err, _data) => {
        if(err) return;
        let data = JSON.parse(_data);

        if(data.type == "hello"){
          websocket.send(zlib.deflateSync(JSON.stringify({
            "type": "identify",
            "data": {
              "token": process.env.UGC_KEY
            }
            }),(err)=>{
              if(err) console.info(`\x1b[31mUGC:ERROR ${err}`); 
           }
          ));
          return;
        }else if(data.type == "message"){
          const msg  = data.data
          return connect(msg);

        }else if(data.type == "identify"){
          return console.info(`\x1b[34mUGC:READY!`); 

        }else if(data.type == "heartbeat"){
          return;
        }
    });
  });
  return;
}

module.exports = gateway