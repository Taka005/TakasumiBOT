const time = []
function spam(message){
  if(new Date() - time[message.guild.id] <= 800){
    time[message.guild.id] = new Date();
    return true
  }else{
    time[message.guild.id] = new Date();
    return false
  }
}

module.exports = spam