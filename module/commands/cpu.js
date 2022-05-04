async function cpu(message){
    const config = require("../../config.json")
    const reply = `<@!${message.author.id}>`
    if(message.content === `${config.prefix}cpu`){
        var cpus = ["Ryzen 9 5950X", "Core i9 12900KS", "Apple M1 Ultra", "Apple M1 Ultra", "Core i9 12900KF", "Core i9 12900K", "Core i9 12900K", "Ryzen 9 5900X", "Ryzen 9 3950X", "Core i9 12900", "Core i9 12900F", "Ryzen 9 5900", "Ryzen 9 5900", "Core i7 12700KF", "Core i7 12700K", "Ryzen 9 3900XT", "Core i7 12700", "Core i7 12700F", "Ryzen 9 3900", "Ryzen 7 5800X", "Core i5 12600KF", "Core i5 12600K", "Ryzen 7 5700X", "Ryzen 7 5800", "Core i9 11900KF", "Core i9 11900K", "Ryzen 7 PRO 5750G", "Core i7 11700K", "Ryzen 7 5700G", "Core i7 11700KF", "Ryzen 7 3800XT", "Core i9 10900K", "Core i9 11900F", "Core i9 10900KF", "Core i9 11900", "Ryzen 7 3800X", "Core i9 10850K", "Core i9 11900F", "Core i9 10900KF", "Core i9 11900", "Ryzen 7 3800X", "Core i9 10850K", "Ryzen 7 3700X", "Ryzen 5 5600X", "Ryzen 5 5600", "Core i5 12600", "Ryzen 7 4700G", "Core i7 11700F", "Core i7 11700", "Ryzen 5 PRO 5650G", "Core i9 10900", "Ryzen 7 PRO 4750G", "Core i9 10900F", "Core i5 12500", "Ryzen 5 5600G", "Core i9 9900KS", "Core i5 11600K", "Core i5 12400", "Core i5 11600KF", "Core i5 12400", "Core i5 11600KF", "Ryzen 7 PRO 4750GE", "Core i5 12400F", "Ryzen 5 5500", "Core i7 10700K", "Core i7 10700KF", "Ryzen 5 3600XT", "Core i9 9900K", "Core i9 9900KF", "Ryzen 5 3600X", "Core i7 10700", "Core i7 10700F", "Core i5 11500", "Ryzen 5 3600", "AMD 4700S", "Core i5 11400", "Core i5 11400F", "Ryzen 7 2700X", "Core i9 9900", "Ryzen 5 4600G", "Ryzen 5 PRO 4650G", "Ryzen 5 PRO 4650G", "Ryzen 5 PRO 4650GE", "Ryzen 7 2700", "Ryzen 7 1700X", "Core i5 10600K", "Core i5 10600KF", "Apple M1 (Rosetta 2)", "Core i7 8086K", "Core i7 9700K", "Core i7 9700KF", "Ryzen 7 1700", "Ryzen 5 2600X", "Core i7 9700F", "Core i5 10600", "Ryzen 3 PRO 5350G", "Core i9 9900T", "Ryzen 3 5300G", "Core i7 9700", "Core i7 8700K", "Core i3 12100", "Core i3 12100F", "Ryzen 5 3500X", "Core i5 10500", "Core i7 8700", "Ryzen 5 2600", "Core i5 10400", "Core i5 10400F", "Ryzen 5 1600X", "Ryzen 5 1600 AF", "Ryzen 3 3300X", "Ryzen 5 3500", "Ryzen 5 1600", "Ryzen 5 1600", "Ryzen 3 3100", "Ryzen 3 4300G", "Ryzen 3 PRO 4350G", "Core i7 9700T", "Core i5 9600K", "Core i5 9600KF", "Core i7 8700T", "Core i5 9600", "Core i5 8600K", "Core i5 8600", "Core i7 7700K", "Core i5 9500", "Core i5 9400F", "Core i5 9400", "Ryzen 5 3400G", "Core i3 10300", "Core i5 8500", "Core i5 8400", "Core i3 10105F", "Core i3 10105", "Core i7 6700K", "Ryzen 5 1500X", "Core i3 10100", "Ryzen 5 2400G", "Core i3 10100F"];
        var random = Math.floor(Math.random() * cpus.length);
        var cpu = cpus[random];
          message.reply({
            embeds:[{
              color: "RANDOM",
              description: `${cpu}`
            }]
          });
        return;
      }
}

module.exports = cpu