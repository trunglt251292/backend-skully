import * as Web3 from './web3';
import Owner from '../models/owner.model';
import Skully from '../models/skullies.model';

export async function getTotalSkully() {
  try{
    let count = await Web3.getCount();
    for (let i = 0 ; i < count ; i++){
      let data = await Web3.getOwnerBySkullyId(i);
      if(data){
        await Owner.update({
          skully:i
        },{
          $set:{
            skully:i,
            miner:data
          }
        },{
          upsert:true
        });
        await Skully.update({

        })
      }
    }
  }catch (err){
    console.log('error getTotalSkully : ', err);
    return false;
  }
}
