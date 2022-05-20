async function note(message){
  const fs = require('fs');
  const config = require("../../config.json")
  const reply = `<@!${message.author.id}>`
    if(message.content.startsWith(`${config.prefix}`)){
      const text = message.content.split(" ").slice(1);
      let filename = message.author.id;
      let usename = message.author.tag;
      if(message.content === `${config.prefix}<help`){
        message.channel.send({
          embeds:[{
            title: "メモ機能のHELP",
            description: "製作者:Taka005#1203\n" + "プレフィックスは`><`です",
            color: "BLUE",
            footer: {
              text: "サポートサーバー\n https://discord.gg/GPs3npB63m"
            },
            fields: [
              {
                name: "**><r**",
                value: "メモに書いた内容を出力します"
              },
              {
                name: "**><n**",
                value: "メモを作成、またはリセットします"
              },
              {
                name: "**><d**",
                value: "メモを削除します"
              },
              {
                name: "**><w**",
                value: "><w [text] でメモを書き込みます"
              },
              {
                name: "**注意点**",
                value: "**1人一つまでしかメモは作成できません**"
              }
            ]
          }]
        });
        return;
      }
      if(message.content === `${config.prefix}<r`){
        fs.readFile(`./note/${filename}.txt`, (err, data) => {
          if(err){
            message.reply("メモを作成してください")
          }else{
            try{
              message.channel.send(`${data}`);
            }catch(error){
              message.reply("技術的な問題が発生しました")
            }
          }
        });
        return;
      }
      if(message.content === `${config.prefix}<n`){
        fs.writeFile(`./note/${filename}.txt`, `----${usename}----`, (err) => {
          if(err){
            message.reply("操作を正常に完了できませんでした")
          }else{
          message.reply("メモを作成、またはリセットしました");
          }
        });
        return;
      }
      if(message.content === `${config.prefix}<d`){
        fs.unlink(`./note/${filename}.txt`, (err) => {
          if(err){
            message.reply("メモを作成してください")
          }else{
            message.reply("メモを削除しました");
          }
        });
        return;
      }
      if(message.content.startsWith(`${config.prefix}<w`)){
        if(!text[0]) return message.reply("メモの内容が必要です");
          message.delete()
          fs.appendFile(`./note/${filename}.txt`, `\n${text}`, (err) => {
            if(err){
              message.channel.send(`${reply}操作を正常に完了できませんでした`)
            }else{
              message.channel.send(`${reply}記入しました`)
            }
          }); 
        return;
      }
    }
}

module.exports = note