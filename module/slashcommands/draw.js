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
      }).catch(()=>interaction.reply({
          embeds:[{
            author: {
              name: "権限が不足しています",
              icon_url: "https://taka.ml/images/error.jpg",
            },
            color: "RED",
            description: `BOTの権限を変更する必要があります`
          }],
          ephemeral:true
        }));
      return;
    }
  };
  
  module.exports = draw