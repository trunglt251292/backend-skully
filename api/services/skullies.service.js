import Skullies from '../models/skullies.model';
import Owner from '../models/owner.model';
import Miner from '../models/miner.model';
import Configs from '../config';
import {mergeMultiSvg} from "../libs/HandleSVG";

export async function setSkullies(options){
  try{
    let miner = await Miner.findOne({address_eth:options.address_eth}).lean();
    if(!miner){
      return Promise.reject({status:400, success:false, error: 'Address Ethereum Not Found.'})
    }
    let owner = await Owner.findOne({miner:miner._id, skully:options.id}).lean();
    if(owner){
      return Promise.reject({status:400, success:false, error: 'This skully have sold.'});
    }
    let skully = await Skullies.findOne({id:options.id});
    if(!skully){
      return Promise.reject({status:400, success:false, error: 'This skully not found.'});
    }
    await Skullies.update({
      id:options.id
    },{
      $set:{
        name:options.name,
        description:options.description,
        "attributes.country": options.country,
        price:options.price
      }
    });
    await Owner.create({
      skully:options.id,
      miner:miner._id
    });
    return await Skullies.findOne({id:options.id}).lean();
  }catch(err){
    console.log('Error addSkullies Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function getSkulliesById(options) {
  try{
    if(isNaN(parseInt(options.id))){
      return Promise.reject({status:400, success:false, error:'Parameter Invalid.'})
    }
    let data = await Skullies.findOne({id:options.id}).lean();
    if(!data){
      return Promise.reject({status:400, success:false, error:'Skullies not found.'})
    }
    return data;
  }catch (err){
    console.log('Error getSkulliesById Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function getSkullyOfOwner(options) {
  try{
    let count = await Owner.count({miner:options.miner});
    let data = await Owner.find({miner:options.miner}).sort({id:1}).limit(options.limit).skip(options.skip).lean();
    data = await getMetaData(data);
    return [count,data];
  }catch (err){
    console.log('Error getSkullyOfOwner Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function getMetaData(data) {
  try{
    let promise = data.map(async e =>{
      e.skully = await Skullies.findOne({id:e.skully}).lean();
      e.miner = await Miner.findOne({address_eth:e.miner}).lean();
      return e;
    });
    return await Promise.all(promise);
  }catch (err){
    console.log('Error getMetaData Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function getAllSkullies(options) {
  try{
    let conditions = {};
    if(options.tag){
      conditions.tags = options.tag;
    }
    let count = await Skullies.count(conditions);
    let data = await Skullies.find(conditions).sort({id:1}).limit(options.limit).skip(options.skip).lean();
    return [count,data];
  }catch (err) {
    console.log('Error getAllSkullies Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function setPrice(options) {
  try{
    let data = await Skullies.findOne({id:options.id}).lean();
    if(!data){
      return Promise.reject({status:400, success:false, error:'Skullies not found.'})
    }
    let miner = await Miner.findOne({address_eth:options.address_eth}).lean();
    if(!miner){
      return Promise.reject({status:400, success:false, error: 'Address Ethereum Not Found.'})
    }
    let owner = await Owner.findOne({miner:miner._id, skully:options.id}).lean();
    if(!owner){
      return Promise.reject({status:400, success:false, error: 'You not permission.'})
    }
    await Skullies.update({id:options.id},{$set:{price:options.price}});
    data.price = options.price;
    return data;
  }catch (err){
    console.log('Error getAllSkullies Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function setId(){
  try{
    let skullies = await Skullies.count();
    return skullies + 1;
  }catch(err){
    console.log('Error',err);
  }
}




