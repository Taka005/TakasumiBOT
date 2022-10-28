function random(arr){
  const number = Math.floor(Math.random() * arr.length);
  return arr[number];
}

function rate(op_1,op_2,number){
  const n = Math.random();
  if(n < number){
    return op_2;
  }else{
    return op_1;
  }
}

module.exports = {
  random,
  rate
}