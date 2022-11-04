module.exports = {
  random:(arr)=>{
    return arr[Math.floor(Math.random() * arr.length)]
  },
  rate:(op_1,op_2,number)=>{
    if(Math.random() < number){
      return op_2;
    }else{
      return op_1;
    }
  }
}