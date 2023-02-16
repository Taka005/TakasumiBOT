module.exports = async(client)=>{
  const zlib = require("zlib");
  const ws = require("ws");
  require("dotenv").config();
  const connect = require("./connect");

  function connection(){
    const websocket = new ws("wss://ugc.renorari.net/api/v2/gateway");

    websocket.on("close",(code,reason)=>{
      console.log(`\x1b[33mWARN: UGC Close ${code} ${reason}`); 
      setTimeout(()=>{
        connection();
      },10000);
    });
    
    websocket.on("error",(error)=>{
      console.log(`\x1b[31mERROR: ${error}`); 
    });

    websocket.on("message",(rawData)=>{
      zlib.inflate(rawData,(err,_data)=>{
        if(err) return console.log(`\x1b[31mERROR: ${err}`);
        let data = JSON.parse(_data);
        if(data.type === "hello"){
          websocket.send(zlib.deflateSync(JSON.stringify({
            "type": "identify",
            "data": {
              "token": process.env.UGC_KEY
            }
            }),(err)=>{
              if(err) return console.log(`\x1b[31mERROR: ${err}`); 
            }
          ));
        }else if(data.type === "message"){
          const msg = data.data.data
          return connect(msg,client);

        }else if(data.type === "identify"){
          if(!data.success) return console.log(`\x1b[31mERROR: Connect UGC Failed`); 
          console.log(`\x1b[34mINFO: Connect UGC`); 

          setInterval(()=>{
            websocket.send(zlib.deflateSync(JSON.stringify({
              "type": "heartbeat"
            }),(err)=>{
              if(err) return console.log(`\x1b[31mERROR: ${err}`); 
            }));
          },10000);
        }
      });
    });
  }
  connection()
}