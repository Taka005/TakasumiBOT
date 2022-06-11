async function quote(message){
  const fs = requie("fs");
  const config = require("../../config.json");
  const canvas = require("canvas");

  if(message.content === `${config.prefix}quote`){
    if(!message.type === `REPLY`) return message.reply("メッセージを返信してください");
    const reply = await message.fetchReference();
    if(!reply.content) return message.reply("メッセージの内容がありません");
      const msg = message.channel.send("生成中...")

      const context = canvas.getContext('2d');
      const background = await Canvas.loadImage('../../quote.jpg');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.strokeRect(0, 0, canvas.width, canvas.height);
      //アバター
      const avatar = await Canvas.loadImage(reply.author.avatarURL({format: 'jpg'}));
      context.drawImage(avatar, 25, 25, 200, 200);
      context.beginPath();
      context.arc(125, 125, 100, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      //内容
      context.font = '60px sans-serif';
      context.fillStyle = '#ffffff';
      context.fillText(reply.content, canvas.width / 2.5, canvas.height / 1.8);
      //名前
      context.font = '28px sans-serif';
      context.fillStyle = '#ffffff';
      context.fillText(reply.author.tag, canvas.width / 2.5, canvas.height / 3.5);
      //モノクロ化
      const mono = context.getImageData(0, 0, canvas.width, canvas.height);
      for(let y=0; y<mono.height; y++){
        for(let x=0; x<mono.width; x++){
          let index = (y*mono.width+x)*4;
          mono.data[index+1] = mono.data[index];
          mono.data[index+2] = mono.data[index];
        }
      }
      context.putImageData(mono, 0, 0);


      const attachment = new MessageAttachment(canvas.toBuffer(), `quote-${reply.author.username}-TakasumiBOT.png`);

      msg.edit({ files: [attachment] })
       .catch(()=>message.edit("画像生成に失敗しました..."))
  }
}

module.exports = quote