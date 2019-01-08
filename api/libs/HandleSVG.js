import fs from 'fs';
import path from 'path';
import svg2png from 'svg2png';
import {JSDOM} from 'jsdom';
import Configs from '../config';
import globalConstants from '../constants';

export async function mergeMultiSvg(options) {
  try {
    let pathNullCat = path.resolve(__dirname, '../../cattributes/null-skully.svg');

    let pathBody = path.resolve(__dirname, '../../cattributes/body/'+options.body+'.svg');
    let pathEye = path.resolve(__dirname, '../../cattributes/eye/'+options.eye+'.svg');
    let pathMouth = path.resolve(__dirname, '../../cattributes/mouth/'+options.mouth+'.svg');

    let nullcat = fs.readFileSync(pathNullCat).toString();
    let bodyCat = fs.readFileSync(pathBody).toString();
    let eyeCat = fs.readFileSync(pathEye).toString();
    let mouthCat = fs.readFileSync(pathMouth).toString();
    let dom = new JSDOM(bodyCat);
    bodyCat = dom.window.document.querySelector("svg").innerHTML;
    dom = new JSDOM(eyeCat);
    eyeCat = dom.window.document.querySelector("svg").innerHTML;
    dom = new JSDOM(mouthCat);
    mouthCat = dom.window.document.querySelector("svg").innerHTML;
    dom = new JSDOM(nullcat);
    dom.window.document.getElementById('bodys').innerHTML = bodyCat;
    dom.window.document.getElementById('eyes').innerHTML = eyeCat;
    dom.window.document.getElementById('mouths').innerHTML = mouthCat;
    nullcat = dom.window.document.querySelector('svg').outerHTML;
    let data = await svg2png(new Buffer(nullcat),{ width: 550, height: 550 });
    fs.writeFileSync('public/avatar/'+options.id+'.png',data);
    return Configs.host+'/avatar/'+options.id+'.png';
  }catch (err){
    console.log('err mergeMultiSvg :: ',err);
    return false;
  }
}
