module.exports = (url)=>{
  if(
    typeof url !== "string"||
    !url.match(/https?/)
  ) return false;
  
  const protocol = /^(?:\w+:)?\/\/(\S+)$/;
  const host = /^[^\s.]+\.\S{2,}$/;

  const match = url.match(protocol);
  if(!match||!match[1]) return false;

  if(host.test(match[1])) return true;

  return false;
}