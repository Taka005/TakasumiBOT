async function hiroyuki(message,client){
    const main = require("../../data/hiroyuki/main.json");
    const sub = require("../../data/hiroyuki/sub.json");
    const random = require("../lib/random");
    const { WebhookClient } = require("discord.js");
    const fs = require("fs");

    if(
      !message.channel.type === "GUILD_TEXT"||
      message.author.bot||
      !main[message.channel.id]
    ) return;
  
    const reply_1 = {
      "嘘": random(["何だろう。噓つくのやめてもらっていいですか？", `嘘は嘘であると見抜ける人でないと(${message.guild.name}を使うのは)難しい`]),
      "写像": "「写像」？なんすか「写像」って...",
      "ごめん": "誰に謝ってんの？",
      "すいません": random(["「すいません」？なんすか「すいません」って...", "何だろう。すみませんって言ってもらってもいいですか？"]),
      "すみません": "誰に謝ってんの？",
      "データ": "データなんかねえよ"
    };

    const reply_2 = [
      `嘘は嘘であると見抜ける人でないと(${message.guild.name}を使うのは)難しい`,
      `「${message.content}」？なんすか「${message.content}」って...`,
      "なんかそういうデータあるんですか？",
      "何だろう。噓つくのやめてもらっていいですか？",
      "それってあなたの感想ですよね？",
      "あなた相当頭悪いですよね…",
      "ちょっと日本語わかりづらいんですけどどちらの国の方ですか？",
      "頭悪いんだからDiscord止めた方がいいっすよ",
      "Bot相手にイラついて恥ずかしくないの？w",
      "それって矛盾してますよね？"
    ];

    const reply_3 = [
      "人間って基本死ぬまでの暇つぶしなんですよ",
      "必要なプライドなんてありません！",
      "はいかいいえで答えてください。",
      "ダメだこりゃ（笑）",
      "はい論破"
    ]

    let content;

    if(Object.keys(reply_1).filter(key=> message.content.match(key))){
      content = Object.keys(sub).filter(key=> message.content.match(key))
    }else if(message.content.match("@everyone")||message.content.match("@here")){
      content = random(["全体メンションする人って相当頭悪いんですよね…", "なんだろう、全体メンションするのやめてもらっていいですか？"])
    }else{
      content = random(random([reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_2,reply_3]))
    }

    const webhooks = new WebhookClient({id: main[message.channel.id][0], token: main[message.channel.id][1]});
    await webhooks.send({
      content : `${content}`
    }).catch((error)=>{
      delete main[message.channel.id];
      const guild = Object.keys(sub).filter((key)=> sub[key] === message.channel.id);
      delete sub[guild];
      fs.writeFileSync("./data/hiroyuki/main.json", JSON.stringify(main), "utf8");
      fs.writeFileSync("./data/hiroyuki/sub.json", JSON.stringify(sub), "utf8");
      delete require.cache[require.resolve("../../data/hiroyuki/sub.json")];
      delete require.cache[require.resolve("../../data/hiroyuki/main.json")];

      client.channels.cache.get(message.channel.id).send({
        embeds:[{
          author: {
            name: "ひろゆきの体調が悪化(エラー)しました",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          description: "ひろゆきの体調が悪化(エラー)したため、強制的に退出されました\n再度登録するには`/hiroyuki`を使用してください",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }]
      })
      .catch(()=>{})
    })
}

module.exports = hiroyuki