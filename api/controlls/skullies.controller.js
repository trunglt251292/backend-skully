import * as Skullies_Service from '../services/skullies.service';


export async function getSkulliesById(req,res){
  try{
    let id = req.params.id;
    if(!id){
      return res.json({status:400, success:false, error:'Params Id Invalid.'})
    }
    let data = await Skullies_Service.getSkulliesById({id});
    return res.json(data);
  }catch(err){
    console.log('Error getSkulliesById : ',err);
    return res.status(err.status).json(err);
  }
}

export async function setSkullies(req,res) {
  try{
    let data = req.body;
    if(!data.id){
      return res.json({status:400, success:false, error: 'Request ID Skullies. Please try again!'});
    }
    if(!data.description || !data.name || !data.address_eth){
      return res.json({status:400, success:false, error: 'Invalid parameter.'})
    }
    data = await Skullies_Service.setSkullies(data);
    return res.json({
      success:true,
      data
    })
  }catch (err){
    console.log('Error addSkullies : ',err);
    return res.status(err.status).json(err);
  }
}

export async function getAllSkullies(req,res) {
  try{
    let data = await Skullies_Service.getAllSkullies();
    return res.json({
      success:true,
      data
    })
  }catch (err){
    console.log('Error getAllSkullies : ',err);
    return res.status(err.status).json(err);
  }
}

export async function setPrice(req,res) {
  try{
    let id = req.params.id;
    if(!id){
      return res.json({status:400, success:false, error:'Params Id Invalid.'})
    }
    let options = {
      id,
      price:req.body.price
    };
    let data = await Skullies_Service.setPrice(options);
    return res.json(data);
  }catch (err){
    console.log('Error getAllSkullies : ',err);
    return res.status(err.status).json(err);
  }
}
