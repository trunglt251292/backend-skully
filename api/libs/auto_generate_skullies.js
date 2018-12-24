import {mergeMultiSvg} from "./HandleSVG";
import Skullies from '../models/skullies.model';
import Constants from '../constants';
import Configs from "../config";
import {setId} from "../services/skullies.service";


export async function generateSkullies() {
  try{
    let count = 1;
    for (let i = 0; i < Constants.body.length; i++){
      console.log('IIIIIIIIIIIIIIIIII : ',i);
      for (let j = 0; j < Constants.mouth.length; j++){
        for (let k = 0; k < Constants.eye.length; k++){
          let data = {
            id: count,
            name: 'Skully '+count,
            description:'Aloha! My name is Young Dingness. My favourite topic of conversation is Andrew Jackson. I still dream of becoming a Train Conductor, but I\'m not sure where to start. Also, I love McDonalds happy meals.',
            external_url: Configs.host+'/api/skullies/'+count,
            svg: Configs.host+'/svg/'+count+'.svg',
            attributes:{
              eye:Constants.eye[k],
              mouth:Constants.mouth[j],
              body:Constants.body[i],
              id:count
            }
          };
          data.image = await mergeMultiSvg(data.attributes);
          if(data.image){
            await Skullies.create(data);
          }
          count++;
        }
      }
    }
    console.log('Done.');
  }catch (err){
    console.log('Error generateSkullies : ',err);
  }
}
