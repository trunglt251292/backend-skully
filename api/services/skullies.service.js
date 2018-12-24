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
   let owner = await Owner.findOne({miner:miner._id, skully:})
  }catch(err){
    console.log('Error addSkullies Services : ',err);
    return Promise.reject({status:500, success:false, error:'Error Internal Server.'})
  }
}

export async function getSkulliesById(options) {
  try{
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

export async function getAllSkullies() {
  try{
    return await Skullies.find({}).sort({id:1}).lean();
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




