async function server(message){
    const config = require("../../config.json");
    if(message.content === `${config.prefix}server`){
        message.reply({
          embeds:[{
            title: "サーバー情報",
            color: 7506394,
            timestamp: new Date(),
            thumbnail: {
              url: `${message.guild.iconURL()}`
            },
            fields: [
              {
                name: "**サーバー名**",
                value: `${message.guild.name}`
              },
              {
                name: "サーバーID",
                value: `${message.guild.id}`
              },
              {
                name: "**サーバーの人数**",
                value: `${message.guild.memberCount}人`
              },
              {
                name: "**ロール**",
                value: `${message.guild.roles.cache.map(r => r).join(' | ')}`
              }
            ]
          }]
        })
      return;
    }
}

module.exports = server