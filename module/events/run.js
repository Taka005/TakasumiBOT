async function run(interaction,client){
  const fs = require("fs");
  if(!interaction.isModalSubmit()) return;
  if(interaction.customId.startsWith("program")){
    const node = interaction.fields.getTextInputValue('node');
    if(!node) return interaction.reply("実行コードを入力してください")
    const script = `function script(interaction,client){\n  ${node}\n}\n\nmodule.exports = script`;

    try{
      fs.writeFileSync(`./note/script.js`, `${script}`, 'utf8');
    }catch(error){
      return interaction.reply(`ファイル書き込み中にエラーが発生しました\n[${error.message}]`);
    }
    try{
      const run = require("../../note/script");
      run(message,client);
    }catch(error){
      return interaction.reply(`実行中にエラーが発生しました[${error.message}]`);
    }finally{
      delete require.cache[require.resolve('../../note/script')];
    }
    return;
  }
}

module.exports = run