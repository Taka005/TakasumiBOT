function random(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function rate(op_1,op_2,number){
  if(Math.random() < number){
    return op_2;
  }else{
    return op_1;
  }
}

module.exports = {
  random,
  rate
}