import {mergeMultiSvg} from "./HandleSVG";
import Skullies from '../models/skullies.model';
import Constants from '../constants';
import Configs from "../config";
import randomcolor from 'randomcolor';
import faker from 'faker';
import {setId} from "../services/skullies.service";
import path from 'path';
import execa from 'execa';


export async function generateSkullies() {
  try{
    await Skullies.remove({});
    // let shell_script = 'cd '+path.join(__dirname,'..','..','public','avatar')+' && rm -f *.png';
    // await execa.shell(shell_script);
    // console.log('Removed file in folder exports success!');
    let count = 0;
    for (let i = 0; i < Constants.body.length; i++){
      for (let j = 0; j < Constants.mouth.length; j++){
        for (let k = 0; k < Constants.eye.length; k++){
          let data = {
            id: count,
            name: faker.name.findName(),
            description:faker.lorem.paragraph(),
            external_url: Configs.host+'/api/skullies/'+count,
            svg: Configs.host+'/svg/'+count+'.svg',
            attributes:{
              eye:Constants.eye[k],
              mouth:Constants.mouth[j],
              body:Constants.body[i],
              country:'',
              latitude:'',
              meridian:'',
              background:randomcolor(),
              id:count
            }
          };
          data.image = Configs.host+'/avatar/skully-map-head.png';
          data.tags = [Constants.eye[k],Constants.mouth[j],Constants.body[i]];
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
