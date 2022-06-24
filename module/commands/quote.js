async function quote(message){
  const config = require("../../config.json");
  const Canvas = require("canvas");
  const { MessageAttachment } = require("discord.js")

  if(message.content === `${config.prefix}quote`){
    const reply = await message.fetchReference();
    if(!reply.content) return message.reply("メッセージの内容がありません");
      const msg = await message.reply("画像生成中...")
      const canvas = Canvas.createCanvas(1200, 630);
      const context = canvas.getContext('2d');
      const background = await Canvas.loadImage('./images/quote.jpg');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.strokeRect(0, 0, canvas.width, canvas.height);
      //アバター
      const avatar = await Canvas.loadImage(reply.author.avatarURL({format: 'jpg'}));
      context.drawImage(avatar, 25, 25, 560, 560);
      context.beginPath();
      context.arc(125, 125, 100, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      //内容
      context.font = '70px sans-serif';
      context.fillStyle = '#ffffff';
      context.fillText(reply.content, canvas.width / 2.5, canvas.height / 2.5);
      //名前
      context.fillText(reply.author.tag, canvas.width / 2.5, canvas.height / 3.5);

      const attachment = new MessageAttachment(canvas.toBuffer(), `quote-${reply.author.username}-TakasumiBOT.png`);
      msg.edit({ files: [attachment] })
       .catch(()=>msg.edit("画像生成に失敗しました..."))
  }
}

module.exports = quote