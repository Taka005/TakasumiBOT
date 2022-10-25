function random(arr){
  const number = Math.floor(Math.random() * arr.length);
  return arr[number];
}

module.exports = random