async function hiroyuki(message,client){
    const main = require("../../data/hiroyuki/main.json");
    const { random, rate } = require("../lib/random");
    const { WebhookClient } = require("discord.js");

    if(
      !message.channel.type === "GUILD_TEXT"||
      message.author.bot||
      !main[message.channel.id]
    ) return;

    const reply_1 = {
      "嘘": random(["何だろう。噓つくのやめてもらっていいですか？", `嘘は嘘であると見抜ける人でないと(${message.guild.name}を使うのは)難しい`,"本当つまんないっすよ",]),
      "写像": "「写像」？なんすか「写像」って...",
      "ごめん": random(["誰に謝ってんの？","さっきと言ってること違いません？","それって矛盾してますよね？"]),
      "すいません": random(["「すいません」？なんすか「すいません」って...", "何だろう。すみませんって言ってもらってもいいですか？","本当つまんないっすよ"]),
      "すみません": random(["誰に謝ってんの？","さっきと言ってること違いません？","それって矛盾してますよね？"]),
      "データ": "データなんかねえよ",
      "学校":"学校でしか学べない価値ってなんだろう、、と思ってみると、「役に立たないことに異議を唱えずにやり抜くこと」 なんじゃないかと思ったわけです",
      "時計":"正しい時間を知るには時計二つではダメなんすよね",
      "事故物件":"事故物件っていいですよね。 事故物件でビデオと回しててワンちゃん何か撮れたら YouTubeとかですげー再生数伸びるんで",
      "プログラミング":"目の前にわからないことがあったときに、先生に聞く能力よりも、ググって調べる能力が高くないと、プログラミングはできません"
    };

    const reply_2 = [
      `嘘は嘘であると見抜ける人でないと(${message.guild.name}を使うのは)難しい`,
      `「${message.content}」？なんすか「${message.content}」って...`,
      "なんかそういうのって頭悪いか、嘘つきかのどちらかですよ",
      "なんかそういうデータあるんですか？",
      "まず、質問に答えてもらっていいですか？",
      "何だろう。噓つくのやめてもらっていいですか？",
      "そういうのやめてもらっていいですか？",
      "さっきと言ってること違いません？",
      "それってあなたの感想ですよね？",
      "あなた相当頭悪いですよね…",
      "社会ってそんなもんじゃないんですか？",
      "ちょっと日本語わかりづらいんですけどどちらの国の方ですか？",
      "頭悪いんだからDiscord止めた方がいいっすよ",
      "Bot相手にイラついて恥ずかしくないの？w",
      "それって矛盾してますよね？",
      "根拠なしに話すのやめてもらえますか？",
      "そういう人って一定数いますよね",
      "それって意味がないと思うんです",
      "なんか言いました？",
      "そうなんですねw",
      "反論ありますか？"
    ];

    const reply_3 = [
      "人間って基本死ぬまでの暇つぶしなんですよ", 
      "頭悪い人はそういう思想になりますよね",
      "嘘は嘘であると見抜ける人でないと(TakasumiBOTを使うのは)難しい",
      "たいていのことは検索すれば答えが出てくるわけで、個人の知識として蓄える必要があるモノってなかなか無いんですよね",
      "必要なプライドなんてありません！",
      "本当つまんないっすよ",
      "え。言えないんすか？",
      "はいかいいえで答えてください。",
      "それが偉いんですか？",
      "ダメだこりゃ（笑）",
      "はい論破"
    ];

    const koizumi = [
      "反省はしているが(反省が)見えない自分に対しても反省している",
      `今のままではいけないと思います。だからこそ${message.guild.name}は今のままではいけないと思っている`,
      `いま${message.author.username}がおっしゃる通りとお申しあげました通りでありますし、`
    ];

    const kinnikun = [
      "やー！",
      "パワー!!",
      "おい！俺の筋肉！",
      "つらいことは必ずあるが、経験することで必ず成長する。"
    ];

    const webhooks = new WebhookClient({id: main[message.channel.id][0], token: main[message.channel.id][1]});

    if(rate(false,true,0.01)){
      return await webhooks.send({
        content: `${random(koizumi)}`,
        username: "小泉進次郎",
        avatarURL: "https://cdn.taka.ml/images/koizumi.png"
      }).catch((error)=>{
        err(message,client,error);
      })
    }else if(rate(false,true,0.01)){
      return await webhooks.send({
        content: `${random(kinnikun)}`,
        username: "なかやまきんに君",
        avatarURL: "https://cdn.taka.ml/images/kinnikun.png"
      }).catch((error)=>{
        err(message,client,error);
      })
    }

    let content;
    if(Object.keys(reply_1).find(key=> message.content.match(key))){
      content = reply_1[Object.keys(reply_1).find(key=> message.content.match(key))]
    }else if(message.content.match("@everyone")||message.content.match("@here")){
      content = random(["全体メンションする人って相当頭悪いんですよね…", "なんだろう、全体メンションするのやめてもらっていいですか？"])
    }else{
      content = random(rate(reply_2,reply_3,0.1))
    }

    await webhooks.send({
      content: `${content}`,
      username: "ひろゆき",
      avatarURL: "https://cdn.taka.ml/images/hiroyuki.png"
    }).catch((error)=>{
      err(message,client,error);
    })
}

function err(message,client,error){
  const main = require("../../data/hiroyuki/main.json");
  const sub = require("../../data/hiroyuki/sub.json");
  const fs = require("fs");
  
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
        name: "ひろゆきの体調が悪化しました",
        icon_url: "https://cdn.taka.ml/images/error.png",
      },
      color: "RED",
      description: "エラーが発生したため、強制的に退出されました\n再度登録するには`/hiroyuki`を使用してください",
      fields: [
        {
          name: "エラーコード",
          value: `\`\`\`${error}\`\`\``
        }
      ]
    }]
  })
  .catch(()=>{})
}

module.exports = hiroyuki