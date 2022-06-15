function events(client){

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
        //other
        const bump = require("./events/bump");
        const antitoken = require("./events/antitoken");
        const reference = require("./events/reference");
        const ngword = require("./events/ngword");
        const urlsecure = require("./events/urlsecure");
        bump(message)
        antitoken(message)
        reference(message,client)
        ngword(message,client)
        urlsecure(message)

        //globalchat
        const global_base = require("./global/global");
        const connect = require("./global/connect");
        const get = require("./global/get");
        global_base(message,client)
        connect(message,client)
        get(message,client)

        if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  

        //console.log
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:(`+message.author.tag+`)`+`${message.content} PING[${client.ws.ping}ms]`);
 
        //commands
        const say = require("./commands/say");
        const join = require("./commands/join");
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
        const global = require("./commands/global");
        const gif = require("./commands/gif");
        const ticket = require("./commands/ticket");
        const quote = require("./commands/quote");

        join(message)
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
        global(message,client)
        gif(message)
        ticket(message)
        quote(message)
        
      return;
    });

    client.on("interactionCreate", async (interaction) =>{
        const help = require("./commands/help");
        const auth = require("./events/auth");
        const panel = require("./events/panel");
        const check = require("./events/check");
        const ticket = require("./events/ticket");
        const support = require("./commands/support");
        const support_receive = require("./events/support_receive");
        const embed_1 = require("./commands/embed");
        const embed_2 = require("./events/embed");

        help(interaction);
        auth(interaction);
        panel(interaction);
        check(interaction);
        ticket(interaction);
        support(interaction);
        support_receive(interaction,client);
        embed_1(interaction);
        embed_2(interaction);
        return;
    });

    client.on("guildMemberAdd", member=>{
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
      
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)

      const join = require("./events/join");
       
      join(member,client);
    });

    client.on('guildMemberRemove', member =>{
        //時間
        var now = new Date();
        var h = now.getHours()
        var m = now.getMinutes()
        var s = now.getSeconds() 
        console.log(`\x1b[37m[${h}:${m}:${s}]LOG:${member.user.tag} PING:${client.ws.ping}ms`)  

        const leave = require("./events/leave");

        leave(member);
    });
}

module.exports = events