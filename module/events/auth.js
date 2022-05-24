async function auth(interaction){
  if(interaction.customId.startsWith("auth_")){
    const role_id = interaction.customId.match(/\d{18}/);
    if(interaction.member.roles.cache.has(role_id)) return interaction.reply({content: "既に役職を付与済みです",ephemeral: true});
    const role = interaction.member.roles.cache(role_id);
    interaction.member.roles.add(role)
      .then(()=>interaction.reply({content: "認証しました",ephemeral: true}))
      .catch(()=>interaction.reply({content: "認証に失敗しました...\nbotの権限を確認してください\n原因が解決できない場合はサポートサーバーまでよろしくお願いします\nhttps://discord.gg/GPs3npB63m",ephemeral: true
    }))
    return;
  }
}

module.export = auth