function events(client){
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
        const connect = require("./global/connect");
        const get = require("./global/get");
        global(message)
        connect(message,client)
        get(message,client)
        
      if(mute_server[`${message.guild.id}`]||mute_user[`${message.author.id}`]){
        return;
      }
        //other
        const bump = require("./events/bump");
        const antitoken = require("./events/antitoken");
        const deployment = require("./events/deployment");
        const urlcheck = require("./events/urlcheck");
        bump(message)
        antitoken(message)
        deployment(message,client)
        urlcheck(message)

        if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  

        //console.log
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:(${message.author.tag}[${message.guild.id}])${message.content} PING[${client.ws.ping}ms]`);
 
        //コマンド
        const say = require("./commands/say");
        const avatar = require("./commands/avater");
        const timer = require("./commands/timer");
        const del = require("./commands/del");
        const draw = require("./commands/draw");
        const cpu = require("./commands/cpu");
        const url = require("./commands/url");
        const hello = require("./commands/hello");
        const poll = require("./commands/poll");
        const status = require("./commands/status");
        const user = require("./commands/user");
        const server = require("./commands/server");
        const note = require("./commands/note");
        const exec = require("./commands/exec");
        const soccer = require("./commands/soccer");
        const echo = require("./commands/echo");
        const auth = require("./commands/auth");
        const panel = require("./commands/panel");
        const dm = require("./commands/dm");
        const gif = require("./commands/gif");
        const ticket = require("./commands/ticket");
        const quote = require("./commands/quote");
        const output = require("./commands/output");

        say(message)
        avatar(message,client)
        timer(message)
        del(message)
        draw(message)
        cpu(message)
        url(message)
        hello(message)
        poll(message)
        status(message,client)
        user(message,client)
        server(message)
        note(message)
        exec(message,client)
        soccer(message)
        echo(message,client)
        auth(message)
        panel(message)
        dm(message,client)
        gif(message)
        ticket(message)
        quote(message)
        output(message,client)

      return;
    });

    client.on("interactionCreate", async (interaction) =>{
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
        const output = require("./slashcommands/output");
        const draw = require("./slashcommands/draw");
        const kick = require("./slashcommands/kick");
        const ban = require("./slashcommands/ban");

        const global = require("./slashcommands/global");
        const mute_user = require("./slashcommands/mute_user");

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
        output(interaction,client);
        draw(interaction);
        kick(interaction);
        ban(interaction);
        global(interaction);
        mute_user(interaction);
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