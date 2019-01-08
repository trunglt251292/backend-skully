import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * {
    "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
    "external_url": "https://openseacreatures.io/3",
    "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    "name": "Dave Starbelly",
    "attributes": [ ... ],
  }
 * */
const Skullies = new Schema({
  id:{type:Number, required:true},
  description:{type:String},
  name:{type:String},
  external_url: {type:String},
  image: {type:String, required:true},
  svg: {type:String, required:true},
  attributes:{type:Object, required:true},
  rank:{type:Number, default:0},
  attack:{type:Number, default:0},
  defend:{type:Number, default:0},
  genes:{type:String},
  active:{type:Boolean, default:false},
  tags:{type:Array, default:[]}
});

export default mongoose.model("skullies", Skullies);
