async function events(client){
  const mute_user = require("../data/block_user.json");
  const mute_server = require("../data/block_server.json");

    client.once("ready", async (client) =>{
       const ready = require("./events/ready");

       ready(client)
    });

    client.on('messageCreate', async (message) =>{
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
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
        const urlcheck = require("./events/urlcheck");
        bump(message);
        open(message,client);
        urlcheck(message);

        if(!message.channel.type === "GUILD_TEXT" || message.author.bot) return;  

        //console.log
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:(${message.author.tag}[${message.guild.id}])${message.content} PING[${client.ws.ping}ms]`);
 
        //コマンド
        const cpu = require("./commands/cpu");
        const exec = require("./commands/exec");
        const quote = require("./commands/quote");

        cpu(message)
        exec(message,client)
        quote(message)

      return;
    });

    client.on('messageUpdate', async (oldMessage,newMessage) =>{
      const dissoku = require("./events/dissoku");

      dissoku(oldMessage,newMessage);
    });

    client.on('messageReactionAdd', async (reaction, user) =>{
      if(!reaction.message.channel.type === "GUILD_TEXT" || user.bot) return;  

      const globalreact = require("./events/globalreact");

      globalreact(reaction,user);
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
      const check = require("./events/check");
      const ticket_event = require("./events/ticket_event");
      const embed_event = require("./events/embed_event");
      const support_event = require("./events/support_event");
      const help_event = require("./events/help_event");

      auth_event(interaction);
      panel_event(interaction);
      check(interaction);
      embed_event(interaction);
      ticket_event(interaction);
      support_event(interaction,client);
      help_event(interaction);

      //スラッシュコマンド
      const support = require("./slashcommands/support");
      const embed = require("./slashcommands/embed");
      const server = require("./slashcommands/server");
      const help = require("./slashcommands/help");
      const status = require("./slashcommands/status");
      const auth = require("./slashcommands/auth");
      const panel = require("./slashcommands/panel");
      const gif = require("./slashcommands/gif");
      const say = require("./slashcommands/say");
      const del = require("./slashcommands/del");
      const invite = require("./slashcommands/invite");
      const user = require("./slashcommands/user");
      const poll = require("./slashcommands/poll");
      const ticket = require("./slashcommands/ticket");
      const channel = require("./slashcommands/channel");
      const avatar = require("./slashcommands/avatar");
      const short = require("./slashcommands/short");
      const output = require("./slashcommands/output");
      const draw = require("./slashcommands/draw");
      const kick = require("./slashcommands/kick");
      const ban = require("./slashcommands/ban");
      const point = require("./slashcommands/point");
      const dm = require("./slashcommands/dm");
      const news = require("./slashcommands/news");
      const npm = require("./slashcommands/npm");
      const wiki = require("./slashcommands/wiki");
      const mc = require("./slashcommands/mc");
      const system = require("./slashcommands/system");

      const global = require("./slashcommands/global");
      const mute = require("./slashcommands/mute");

      //ContextMenu
      const member = require("./contextmenu/member");

      help(interaction);
      support(interaction);
      embed(interaction);
      server(interaction);
      status(interaction,client);
      auth(interaction);
      panel(interaction);
      gif(interaction);
      say(interaction);
      del(interaction);
      invite(interaction);
      user(interaction,client);
      poll(interaction);
      ticket(interaction);
      channel(interaction,client);
      avatar(interaction,client);
      short(interaction);
      output(interaction,client);
      draw(interaction);
      kick(interaction);
      ban(interaction,client);
      point(interaction,client)
      global(interaction);
      mute(interaction,client);
      dm(interaction,client);
      news(interaction);
      npm(interaction);
      wiki(interaction);
      mc(interaction);
      system(interaction,client);

      //ContextMenu
      member(interaction);
      return;
    });

    client.on("guildMemberAdd", member=>{
        let now = new Date();
        let h = now.getHours()
        let m = now.getMinutes()
        let s = now.getSeconds() 
      
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)

      const join = require("./events/join");
       
      join(member,client);
    });

    client.on('guildMemberRemove', member =>{
        //時間
      let now = new Date();
      let h = now.getHours()
      let m = now.getMinutes()
      let s = now.getSeconds() 
      console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)  

        const leave = require("./events/leave");

        leave(member);
    });
}

module.exports = events