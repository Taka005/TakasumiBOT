module.exports = async(client)=>{
  const fs = require("fs");

  client.once("ready", async (client) =>{
    const ready = require("./events/ready");

    ready(client)
  });

  client.on("messageCreate", async (message) =>{
    //globalchat
    const global = require("./global/global");
    const reply = require("./global/reply");
    const send = require("./global/send");
    global(message,client);
    reply(message,client);
    send(message);

    //other
    const bump = require("./events/bump");
    const open = require("./events/open");
    const hiroyuki = require("./events/hiroyuki");
    bump(message);
    open(message,client);
    hiroyuki(message,client);

    if(!message.channel.type === "GUILD_TEXT" || message.author.bot) return;  

    //console.log
    console.log(`\x1b[37mLOG:(${message.author.tag}[${message.guild.id}])${message.content} PING[${client.ws.ping}ms]`);

    //コマンド
    fs.readdir("./module/commands/", (err,files) =>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./commands/${file}`);
        event(message,client);
      });
    });
  });

  client.on("messageUpdate", async (oldMessage,newMessage) =>{
    const dissoku = require("./events/dissoku");

    dissoku(oldMessage,newMessage);
  });

  client.on("messageReactionAdd", async (reaction, user) =>{
    if(!reaction.message.channel.type === "GUILD_TEXT" || user.bot) return;  
    return 0;
  });

  client.on("guildCreate", guild =>{
    const invite = require("./events/invite");

    invite(guild);
  });

  client.on("interactionCreate", async (interaction) =>{

    if(!interaction.guild) return await interaction.reply({ 
      embeds:[{
        author: {
          name: "コマンドが実行できません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "BOTの操作はDMで実行することができません\nサーバー内で実行してください"
      }], 
      ephemeral: true 
    });

    //イベント
    const auth_event = require("./events/auth_event");
    const panel_event = require("./events/panel_event");
    const ticket_event = require("./events/ticket_event");
    const embed_event = require("./events/embed_event");
    const support_event = require("./events/support_event");
    const help_event = require("./events/help_event");
    const guideline_event = require("./events/guideline_event");
    const role_event = require("./events/role_event");
    const news_event = require("./events/news_event");

    const guideline_role = require("./events/guideline_role");
    const panel_role = require("./events/panel_role");

    auth_event(interaction);
    panel_event(interaction);
    embed_event(interaction);
    ticket_event(interaction);
    support_event(interaction,client);
    help_event(interaction);
    guideline_event(interaction);
    role_event(interaction);
    news_event(interaction);

    guideline_role(interaction);
    panel_role(interaction);

    //スラッシュコマンド
    fs.readdir("./module/slashcommands/", (err,files) =>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./slashcommands/${file}`);
        event(interaction,client);
      });
    });
    //ContextMenu
    fs.readdir("./module/contextmenu/", (err,files) =>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./contextmenu/${file}`);
        event(interaction,client);
      });
    });
  });

  client.on("guildMemberAdd", member=>{
    const join = require("./events/join");
      
    join(member,client);
  });

  client.on("guildMemberRemove", member =>{
    const leave = require("./events/leave");

    leave(member);
  });
}