import Miner from '../models/miner.model';

export async function createMiner(options) {
  try {
    let miner = await Miner.findOne({address_eth:options.address_eth}).lean();
    if(miner){
      return miner;
    }
    return await Miner.create(options);
  } catch (err) {
    console.log('error createMiner : ', err);
    return Promise.reject({status: 500, success: false, error: 'Internal Server Error.'});
  }
}