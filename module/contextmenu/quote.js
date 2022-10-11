async function quote(interaction){
  const Canvas = require("canvas"); 
  const { MessageAttachment } = require("discord.js");
  if(!interaction.isContextMenu()) return;
  if(interaction.commandName === "Make it a Quote"){
    const message = await interaction.options.getMessage("message");
    await interaction.deferReply();
    await interaction.editReply("生成中...")

    Canvas.registerFont('./file/nijimi.ttf',{ family: "nijimi" });
    const canvas = Canvas.createCanvas(1200, 600);
    const context = canvas.getContext("2d"); 

    //バックグラウンド描画
    const background = await Canvas.loadImage("./file/black.png");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    //アバター描画
    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: "png" }));
    context.drawImage(avatar, 0, 0, 600, 600);
    //前面描画
    const back = await Canvas.loadImage("./file/back.png");
    context.drawImage(back, 0, 0, canvas.width, canvas.height);
    //モノクロ処理
    const src = context.getImageData(0, 0, canvas.width, canvas.height);
    const dst = context.createImageData(canvas.width, canvas.height);
    for(let i = 0; i < src.data.length; i += 4){
      let y = 0.2126 * src.data[i] + 0.7152 * src.data[i + 1] + 0.0722 * src.data[i + 2];
      y = parseInt(y, 10);
      dst.data[i] = y
      dst.data[i + 1] = y;
      dst.data[i + 2] = y;
      dst.data[i + 3] = src.data[i + 3]
    }
    context.putImageData(dst, 0, 0);

    const msg = message.cleanContent.replace(/(.{15})/g, "$1\n")

    context.font = "45px nijimi";
    context.fillStyle = '#ffffff';
    context.fillText(msg, 500, 180);

    context.font = "30px nijimi";
    context.fillStyle = '#ffffff';
    context.fillText(`-${message.author.tag}`, 650, 510);
    
    //文字 TakasumiBOT
    context.fillStyle = '#696969';
    context.font = "20px nijimi";
    context.fillText("TakasumiBOT#7189",1005, 595);
     
    interaction.editReply({ 
      content: `[生成元](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
      files: [new MessageAttachment(canvas.toBuffer(), "Takasumi_Quote.png")]
    }); 
  }
}

module.exports = quote