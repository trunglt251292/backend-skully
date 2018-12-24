import request from 'request-promise'

module.exports = (method, url, body = null) =>{
  let options = {
    method,
    uri:url,
    header:{
      'content-type': 'application/json'
    },
    json:true
  };
  if(method.toLowerCase() !== 'get' && body){
    options.body = body;
  }
  return new Promise((resolve, reject)=>{
    request(options)
      .then((response)=>{
        resolve(response)
      })
      .catch(err=>{
        reject(err)
      })
  })
};