module.exports = async(interaction)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "omikuji"){
    const draws = ["大吉", "中吉", "小吉","小吉", "吉","吉","吉","凶", "大凶"];
    const result = draws[Math.floor(Math.random() * draws.length)];
    await interaction.reply({
      embeds:[{
        color: "RANDOM",
        description: result
        }]
    });
  }
}
