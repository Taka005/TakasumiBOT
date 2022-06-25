async function quote(message){
  const config = require("../../config.json");
  const Canvas = require("canvas");
  const { MessageAttachment } = require("discord.js")

  if(message.content === `${config.prefix}quote`){
    const reply = await message.fetchReference();
    if(!reply.content) return message.reply("メッセージの内容がありません");
      const msg = await message.reply("画像生成中...");

      let fontSize = 50;
      const applyText = (canvas, text) => {
          const context = canvas.getContext('2d');
          do {
              context.font = `${fontSize / 2}px Noto Sans JP`;
          } while (context.measureText(text).width > canvas.width - 300);
          return context.font;
      };
      const canvas = Canvas.createCanvas(700, 250);
      const context = canvas.getContext('2d');
      const background = await Canvas.loadImage("./images/quote.jpg");
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.strokeStyle = '#0099ff';
      context.strokeRect(0, 0, canvas.width, canvas.height);
      context.font = `${fontSize}px Noto Sans JP`;
      context.fillStyle = '#ffffff';
      context.fillText(reply.content, canvas.width / 2.5, canvas.height / 1.8);
      context.font = applyText(canvas, reply.author.tag);
      context.fillStyle = '#ffffff';
      context.fillText(reply.author.tag, canvas.width / 2.5, canvas.height / 3.5);
      context.beginPath();
      context.arc(125, 125, 100, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      const avatar = await Canvas.loadImage(reply.author.displayAvatarURL({ format: 'jpg' }));
      context.drawImage(avatar, 25, 25, 200, 200);
      context.drawImage(avatar, 25, 0, 200, canvas.height);

      const attachment = new MessageAttachment(canvas.toBuffer(), `${reply.author.username}_TakasumiBOT.png`);
      msg.edit({ files: [attachment] })
       .catch(()=>msg.edit("画像生成に失敗しました..."))
  }
}

module.exports = quote