async function chat(message){
if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
 if(message.content.match(/パー|ピー|プー|ペー|ポー/)){
   message.channel.send("ぺポーイ");
   return;
 }
 if(message.content.match(/はー|ひー|ふー|へー|ほー/)){
    message.channel.send("ほはーい");
    return;
 }
 if(message.content.match(/うぇ/)){
    message.channel.send("うう..");
    return;
 }
 if(message.content.match(/草/)){
    message.channel.send("HAHAH");
    return;
 }
 if(message.content.match(/あー|いー/)){
   message.channel.sned("あーい");
   return;
 }
 if(message.content.match(/www/)){
    message.channel.send("ワールド..ワイドウェブ?");
    return;
 }
 if(message.content.match(/ぺぺ|ぽ？|ぴ？|ぺ？/)){
    message.channel.send("ペポ？");
    return;
 }
 if(message.content.match(/なあー|なあ〜|あー|あ〜/)){
    message.channel.send("そーい");
    return;
 }
 if(message.content.match(/行く|いく/)){
    message.channel.send("どこいくペポ？");
    return;
 }
 if(message.content.match(/酔う|酔った/)){
   message.channel.send("まーまー");
   return;
 }
}

module.exports = chat