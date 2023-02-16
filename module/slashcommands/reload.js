module.exports = async(interaction,client)=>{
  const fs = require("fs");
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
      fs.readdir("./module/commands/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../commands/${file}`);
          delete require.cache[require.resolve(`../commands/${file}`)];
        });
      });
      //ContextMenu
      fs.readdir("./module/contextmenu/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../contextmenu/${file}`);
          delete require.cache[require.resolve(`../contextmenu/${file}`)];
        });
      });
      //events
      fs.readdir("./module/events/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../events/${file}`);
          delete require.cache[require.resolve(`../events/${file}`)];
        });
      });
      //events/interaction
      fs.readdir("./module/events/interaction/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../events/interaction/${file}`);
          delete require.cache[require.resolve(`../events/interaction/${file}`)];
        });
      });
      //events/message
      fs.readdir("./module/events/message/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../events/message/${file}`);
          delete require.cache[require.resolve(`../events/message/${file}`)];
        });
      });
      //lib
      fs.readdir("./module/lib/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../lib/${file}`);
          delete require.cache[require.resolve(`../lib/${file}`)];
        });
      });
      //global
      fs.readdir("./module/global/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../global/${file}`);
          delete require.cache[require.resolve(`../global/${file}`)];
        });
      });
      //slashcommands
      fs.readdir("./module/slashcommands/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../slashcommands/${file}`);
          delete require.cache[require.resolve(`../slashcommands/${file}`)];
        });
      });
      //slashcommands
      fs.readdir("./module/auth/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../auth/${file}`);
          delete require.cache[require.resolve(`../auth/${file}`)];
        });
      });
      //api
      fs.readdir("./module/api/", (err,files) =>{ 
        files.forEach((file) =>{
          if(!file.endsWith(`.js`)) return;
          require(`../api/${file}`);
          delete require.cache[require.resolve(`../api/${file}`)];
        });
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