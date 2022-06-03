function connect(message,client){
  const buffer = require('buffer');
  if(message.author.bot || message.channel.topic !== "==GLOBAL==") return;

  let attachment_list = [];
  message.attachments.forEach((attachment) => {
      let file = attachment.toJSON();
      file.content_type = attachment.contentType;
      attachment_list.push(file);
  });

  client.channels.cache.get("949862388969119755").send({
    embeds: [{
      description: new Buffer.from(
        JSON.stringify(
          {
            "channel": {
              "name": message.channel.name,
              "id": message.channel.id
            },
            "author": {
              "username": message.author.username,
              "discriminator": message.author.discriminator,
              "id": message.author.id,
              "avatarURL": message.author.avatarURL({"dynamic": true,"format": "png", "size": 512}),
              "bot": message.author.bot
            },
            "guild": {
              "name": message.guild.name,
              "id": message.guild.id,
              "iconURL": message.guild.iconURL({"dynamic": true,"format": "png", "size": 256})
            },
            "message": {
              "content": message.content,
              "id": message.id,
              "cleanContent": message.cleanContent,
              "reference": message.reference,
              "attachments": attachment_list,
              "embeds": []
            }
          }
        )).toString("base64")
      }]
  });
}

module.exports = connect