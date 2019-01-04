import Miner from '../models/miner.model';
import faker from "faker";

export async function createMiner(options) {
  try {
    let miner = await Miner.findOne({address_eth:options.address_eth}).lean();
    if(miner){
      return miner;
    }
    options.avatar = faker.image.cats();
    return await Miner.create(options);
  } catch (err) {
    console.log('error createMiner : ', err);
    return Promise.reject({status: 500, success: false, error: 'Internal Server Error.'});
  }
}

export async function getMiner(options) {
  try {
    let miner = await Miner.findOne({address_eth:options},'username email avatar').lean();
    if(!miner){
      return Promise.reject({status: 400, success: false, error: 'Miner not found.'});
    }
    return miner;
  } catch (err){
    console.log('error getMiner : ', err);
    return Promise.reject({status: 500, success: false, error: 'Internal Server Error.'});
  }
}
