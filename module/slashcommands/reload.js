module.exports = async(interaction,client)=>{
  const fs = require("fs");
  const async = require("async");
  const { admin } = require("../../config.json");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "reload"){
    
    if(interaction.member.user.id !== admin) return await interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "このコマンドは、関係者以外実行できません"
      }],
      ephemeral:true
    });
    
    try{
      //commands
      async.each(fs.readdirSync("./module/commands/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../commands/${file}`);
        delete require.cache[require.resolve(`../commands/${file}`)];
      });
      //ContextMenu
      async.each(fs.readdirSync("./module/contextmenu/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../contextmenu/${file}`);
        delete require.cache[require.resolve(`../contextmenu/${file}`)];
      });
      //events
      async.each(fs.readdirSync("./module/events/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../events/${file}`);
        delete require.cache[require.resolve(`../events/${file}`)];
      });
      //events/interaction
      async.each(fs.readdirSync("./module/events/interaction/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../events/interaction/${file}`);
        delete require.cache[require.resolve(`../events/interaction/${file}`)];
      });
      //events/message
      async.each(fs.readdirSync("./module/events/message/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../events/message/${file}`);
        delete require.cache[require.resolve(`../events/message/${file}`)];
      });
      //lib
      async.each(fs.readdirSync("./module/lib/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../lib/${file}`);
        delete require.cache[require.resolve(`../lib/${file}`)];
      });
      //global
      async.each(fs.readdirSync("./module/global/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../global/${file}`);
        delete require.cache[require.resolve(`../global/${file}`)];
      });
      //slashcommands
      async.each(fs.readdirSync("./module/slashcommands/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../slashcommands/${file}`);
        delete require.cache[require.resolve(`../slashcommands/${file}`)];
      });
      //auth
      async.each(fs.readdirSync("./module/auth/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../auth/${file}`);
        delete require.cache[require.resolve(`../auth/${file}`)];
      });
      //api
      async.each(fs.readdirSync("./module/api/"),async(file)=>{
        if(!file.endsWith(".js")) return;
        require(`../api/${file}`);
        delete require.cache[require.resolve(`../api/${file}`)];
      });
      
      //その他
      delete require.cache[require.resolve("../events.js")];

      delete require.cache[require.resolve("../../config.json")];
      delete require.cache[require.resolve("../../package.json")];
      delete require.cache[require.resolve("../../package-lock.json")];

      delete require.cache[require.resolve("../../data/api.json")];

      delete require.cache[require.resolve("../../data/global/main.json")];
      delete require.cache[require.resolve("../../data/global/sub.json")];

      delete require.cache[require.resolve("../../data/hiroyuki/main.json")];
      delete require.cache[require.resolve("../../data/hiroyuki/sub.json")];

      const command = require("../events/command");
      command(client);

      await interaction.reply({
        embeds:[{
          color: "GREEN",
          description: "リロードが完了しました",
        }]
      });
    
    }catch(error){
      await interaction.reply({
        embeds:[{
          color: "RED",
          description: "リロードに失敗しました",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }]
      });
    }
  }
}