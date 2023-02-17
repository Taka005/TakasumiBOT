module.exports = async(client)=>{
  const { MessageButton, MessageActionRow } = require("discord.js");
  const fs = require("fs");
  const async = require("async");

  client.once("ready",async(client)=>{
    const status = require("./events/status");
    const command = require("./events/command");

    status(client);
    command(client);
  });

  client.on("messageCreate",async(message)=>{

    //globalchat
    const global = require("./global/global");
    const reply = require("./global/reply");
    const send = require("./global/send");
    global(message,client)
      .catch(()=>{});
    reply(message,client)
      .catch(()=>{});
    send(message)
      .catch(()=>{});

    //event/message
    async.each(fs.readdirSync("./module/events/message/"),async(file)=>{
      if(!file.endsWith(".js")) return;
      const event = require(`./events/message/${file}`);
      await event(message,client);
    });

    if(message.channel.type !== "GUILD_TEXT"||message.author.bot) return;  

    console.log(`\x1b[37mLOG:(${message.author.tag}[${message.guild.id}])${message.content} PING[${client.ws.ping}ms]`);

    //コマンド
    async.each(fs.readdirSync("./module/commands/"),async(file)=>{
      if(!file.endsWith(".js")) return;
      const event = require(`./commands/${file}`);
      await event(message,client);
    });
  });

  client.on("messageUpdate",async(oldMessage,newMessage)=>{
    const dissoku = require("./events/dissoku");

    dissoku(newMessage);
  });

  client.on("guildCreate",async(guild)=>{
    const add = require("./events/add");

    add(guild);
  });
  
  client.on("guildDelete",async(guild)=>{
    const remove = require("./events/remove");

    remove(guild);
  });

  client.on("interactionCreate",async(interaction)=>{

    if(!interaction.guild) return await interaction.reply({ 
      embeds:[{
        author: {
          name: "コマンドが実行できません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "BOTの操作はDMで実行することができません\nサーバー内で実行してください"
      }],      
      components: [
        new MessageActionRow()
          .addComponents( 
            new MessageButton()
              .setLabel("サポートサーバー")
              .setURL("https://discord.gg/NEesRdGQwD")
              .setStyle("LINK"))
      ]
    });

    try{
      //event/interaction
      async.each(fs.readdirSync("./module/events/interaction/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        const event = require(`./events/interaction/${file}`);
        await event(interaction,client);
      });
      //auth
      async.each(fs.readdirSync("./module/auth/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        const event = require(`./auth/${file}`);
        await event(interaction,client);
      });
      //slashcommands
      async.each(fs.readdirSync("./module/slashcommands/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        const event = require(`./slashcommands/${file}`);
        await event(interaction,client);
      });
      //contextmenu
      async.each(fs.readdirSync("./module/contextmenu/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        const event = require(`./contextmenu/${file}`);
        await event(interaction,client);
      });
    }catch(error){
      await interaction.reply({ 
        embeds:[{
          author: {
            name: "エラーが発生しました",
            icon_url: "https://cdn.taka.ml/images/system/error.png",
          },
          color: "RED",
          description: "複数回実行しても発生する場合はサポートサーバーに報告してください",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error.stack}\`\`\``
            }
          ]
        }], 
        components: [
          new MessageActionRow()
            .addComponents( 
              new MessageButton()
                .setLabel("サポートサーバー")
                .setURL("https://discord.gg/NEesRdGQwD")
                .setStyle("LINK"))
        ],
        ephemeral: true 
      });
    }
  });

  client.on("guildMemberAdd",async(member)=>{
    const join = require("./events/join");
      
    join(member,client);
  });

  client.on("guildMemberRemove",async(member)=>{
    const leave = require("./events/leave");

    leave(member);
  });
}