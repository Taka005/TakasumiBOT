module.exports = async(client)=>{
  const zlib = require("zlib");
  const ws = require("ws");
  require("dotenv").config();
  const connect = require("./connect");

  function websocket(){
    const Client = new ws("wss://ugc.renorari.net/api/v2/gateway");

    Client.on("close",(code,reason)=>{
      setTimeout(() =>{
        websocket();
      }, 10000);
      return console.log(`\x1b[33mWARN: UGC Close ${code} ${reason}`); 
    });
    
    Client.on("error",(error)=>{
      return console.log(`\x1b[31mERROR: ${error}`); 
    });

    Client.on("message",(rawData)=>{
      zlib.inflate(rawData,(err,_data)=>{
        if(err) return console.log(`\x1b[31mERROR: ${err}`);
        let data = JSON.parse(_data);
        if(data.type === "hello"){
          Client.send(zlib.deflateSync(JSON.stringify({
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
            Client.send(zlib.deflateSync(JSON.stringify({
              "type": "heartbeat"
            }),(err)=>{
              if(err) return console.log(`\x1b[31mERROR: ${err}`); 
            }));
          },10000);
        }
      });
    });
  }
  websocket()
}