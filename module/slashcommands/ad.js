module.exports = async(interaction,client)=>{
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ad"){
    const types = await interaction.options.getString("types");
    const server = Math.floor(client.guilds.cache.size/10)*10
    
    if(types === "normal"){
      interaction.reply({
        embeds:[{
          color: "GREEN",
          description: `**◢◤◢◤◢◤ TakasumiBOT ◢◤◢◤◢◤**\nとても便利なBOTです\nグローバルチャット、認証機能などさまざまな便利機能があります\n導入数 ${server}サーバー超え!\n\n・招待\nhttps://bot.taka.ml/\n・ 公式サイト\nhttps://takasumibot.taka.ml/\n・ステータス\nhttps://status.taka.ml/\n・TakasumiBOT Members\nhttps://auth.taka.ml/\n・グローバルチャットのガイド\nhttps://gc.taka.ml/\n・サポートサーバー\nhttps://discord.taka.ml/\n・Email\nsupport@taka.ml\n\nよければプロジェクトに貢献してください\nhttps://github.com/Taka005/TakasumiBOT\n**◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤**`
        }]
      });
    }else if(types === "simple"){
      interaction.reply({
        embeds:[{
          color: "GREEN",
          description: `**◢◤◢◤◢◤ TakasumiBOT ◢◤◢◤◢◤**\nとても便利なBOTです\nグローバルチャット、認証機能などさまざまな便利機能があります\n導入数 ${server}サーバー超え!\n\n・招待\nhttps://bot.taka.ml/\n・公式サイト\nhttps://takasumibot.taka.ml/\n・サポートサーバー\nhttps://discord.taka.ml/\n**◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤**`
        }]
      });
    }
  }
}