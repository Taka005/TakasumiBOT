async function chat(message){
if(!message.channel.type === 'GUILD_TEXT' || message.author.bot) return;  
 if(message.content.match(/(パー|ピー|プー|ペー|ポー)/g)){
   message.channel.send("ぺポーイ");
   return;
 }
 if(message.content.match(/(はー|ひー|ふー|へー|ほー)/g)){
    message.channel.send("ほはーい");
    return;
 }
 if(message.content.match(/(うぇ)/g)){
    message.channel.send("うう..");
    return;
 }
 if(message.content.match(/(草)/g)){
    message.channel.send("HAHAH");
    return;
 }
 if(message.content.match(/(あー|いー)/g)){
   message.channel.sned("あーい");
   return;
 }
 if(message.content.match(/(www)/g)){
    message.channel.send("ワールド..ワイドウェブ?");
    return;
 }
 if(message.content.match(/(ぺぺ|ぽ？|ぴ？|ぺ？)/g)){
    message.channel.send("ペポ？");
    return;
 }
 if(message.content.match(/(なあー|なあ〜|あー|あ〜)/g)){
    message.channel.send("そーい");
    return;
 }
 if(message.content.match(/(行く|いく)/g)){
    message.channel.send("どこいくペポ？");
    return;
 }
 if(message.content.match(/(酔う|酔った)/g)){
   message.channel.send("まーまー");
   return;
 }
}

module.exports = chat