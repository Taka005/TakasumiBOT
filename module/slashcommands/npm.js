async function npm(interaction){
  const fetch = require("node-fetch");
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "npm"){
    const package = await interaction.options.getString("name");
    const package_data = await fetch(`https://api.npms.io/v2/search?q=${package}`)
      .then(res => res.json());

    try{
      const pkg = package_data.results[0].package
      await interaction.reply({
        embeds:[{
          title: pkg.name,
          url: pkg.links.npm,
          color: "WHITE",
          description: pkg.description,
          thumbnail: {
            url: "https://images-ext-1.discordapp.net/external/JsiJqfRfsvrh5IsOkIF_WmOd0_qSnf8lY9Wu9mRUJYI/https/images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png",
          },
          fields: [
            {
              name: "作者",
              value: pkg.author ? pkg.author.name : "なし",
              inline: true
            },
            {
              name: "バージョン",
              value: pkg.version,
              inline: true
            },
            {
              name: "リポジトリ",
              value: pkg.links.repository ? pkg.links.repository : "なし",
              inline: true
            },
            {
              name: "パッケージ保有者",
              value: pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : "なし",
              inline: true
            },
            {
              name: "キーワード",
              value: pkg.keywords ? pkg.keywords.join(', ') : "なし",
              inline: true
            }
          ],
          footer: {
            text: "TakasumiBOT"
          }
        }]
      })
    }catch{
      await interaction.reply({
        embeds:[{
          author: {
            name: "パッケージが取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "検索ワードを変えて、もう一度実行してください"
        }],
        ephemeral:true
      });
    }
  }
}

module.exports = npm