async function draw(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "draw"){
    const draws = ["大吉", "中吉", "小吉","小吉", "吉","吉","吉","凶", "大凶"];
    const random = Math.floor(Math.random() * draws.length);
    const result = draws[random];
      interaction.reply({
        embeds:[{
          color: "RANDOM",
          description: `${result}`
          }]
      });
    }
  }
  
  module.exports = draw