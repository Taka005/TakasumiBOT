module.exports = (url)=>{
  if(typeof url !== "string") return false;
  
  const protocol = /^(?:\w+:)?\/\/(\S+)$/;
  const localhost = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
  const noLocalhost = /^[^\s.]+\.\S{2,}$/;

  const match = url.match(protocol);
  if(!match||!match[1]) return false;

  if(
    localhost.test(match[1])||
    noLocalhost.test(match[1])
  ) return true;

  return false;
}