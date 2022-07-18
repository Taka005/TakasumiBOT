async function join(member){
  const config = require("../../config.json");
  const Canvas = require("canvas");
  const { MessageAttachment } = require("discord.js");

//  if(member.guild.id !== `${config.serverid}`) return;
if(member.guild.id !== "948938383122645002") return;

  const canvas = Canvas.createCanvas(1772, 633);
  const ctx = canvas.getContext("2d");
  const background = await Canvas.loadImage(`../../images/welcome.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f2f2f2';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    let textString3 = `${member.user.username}`;
    if(textString3.length >= 14){
      ctx.font = 'bold 100px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }else{
      ctx.font = 'bold 150px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }

    let textString2 = `#${member.user.discriminator}`;
    ctx.font = 'bold 40px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString2, 730, canvas.height / 2 + 58);

    let textString4 = `Member #${member.guild.memberCount}`;
    ctx.font = 'bold 60px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString4, 750, canvas.height / 2 + 125);
    let textString5 = `${member.guild.name}`;
    ctx.font = 'bold 60px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString5, 700, canvas.height / 2 - 150);

    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

    const attachment = new MessageAttachment()
      .setDescription("ようこそ!") 
      .setFile(canvas.toBuffer()) 
      .setName("welcome-image.png")
      member.guild.channels.cache.get("965061238935666778").send({files: [attachment]})

//  member.guild.channels.cache.get(`${config.enter_channel}`).send({files: [attachment]})
    
//  member.guild.channels.cache.get(`${config.member_channel}`).send(`<@&${config.member_mention}>`+`${member.user.tag}がサーバーに参加しました。\n現在、${member.guild.memberCount}人がサーバーに参加中...`);
}

module.exports = join