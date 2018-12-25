import * as Skullies_Service from '../services/skullies.service';

const LIMIT = 10;
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
    if(!data.description || !data.name || !data.address_eth || !data.country || !data.price){
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
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || LIMIT;
    let skip = (page - 1)*limit;
    let options = {
      limit,
      skip
    };
    console.log(options);
    let data = await Skullies_Service.getAllSkullies(options);
    return res.json({
      success:true,
      total_page: Math.ceil(data[0]/limit),
      total_item: data[0],
      page,
      item: data[1].length,
      data:data[1]
    })
  }catch (err){
    console.log('Error getAllSkullies : ',err);
    return res.status(err.status).json(err);
  }
}

export async function setPrice(req,res) {
  try{
    let id = req.params.id;
    if(!id && isNaN(parseInt(id))){
      return res.json({status:400, success:false, error:'Params Id Invalid.'})
    }
    let options = {
      id,
      price:req.body.price,
      address_eth:req.body.address_eth
    };
    let data = await Skullies_Service.setPrice(options);
    return res.json(data);
  }catch (err){
    console.log('Error getAllSkullies : ',err);
    return res.status(err.status).json(err);
  }
}
