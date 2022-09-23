async function gateway(){
  const zlib = require("zlib");
  const ws = require("ws");
  require("dotenv").config();
  const connect = require("./connect");
  const websocket = new ws("wss://ugc.renorari.net/api/v1/gateway");

  websocket.on("close", (code, reason)=>{
    let now = new Date();
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds() 

    return console.info(`\x1b[33m[${h}:${m}:${s}]UGC:CLOSE ${code}:${reason}`); 
  });
    
  websocket.on("error", (error)=>{
    let now = new Date();
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds() 

    return console.info(`\x1b[31m[${h}:${m}:${s}]UGC:ERROR ${error}`); 
  });

  websocket.on("message", (rawData)=>{
    let now = new Date();
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds() 

    zlib.inflate(rawData, (err,_data) =>{
      if(err) return console.log(`\x1b[31m[${h}:${m}:${s}]UGC:ERROR ${err}`);
      let data = JSON.parse(_data);
      if(data.type == "hello"){
        websocket.send(zlib.deflateSync(JSON.stringify({
          "type": "identify",
          "data": {
            "token": process.env.UGC_KEY
          }
          }),(err)=>{
            if(err) return console.info(`\x1b[31m[${h}:${m}:${s}]UGC:ERROR ${err}`); 
          }
        ));
        return;
      }else if(data.type == "message"){
        const msg = data.data.data
        return connect(msg);

      }else if(data.type == "identify"){
        if(!data.success) return console.info(`\x1b[31m[${h}:${m}:${s}]UGC:ERROR No Ready`); 
        return console.info(`\x1b[34m[${h}:${m}:${s}]UGC:READY!`); 

      }else if(data.type == "heartbeat"){
        return;
      }
    });
  });
  return;
}

module.exports = gateway