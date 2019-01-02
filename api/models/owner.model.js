import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const owner = new Schema({
  skully:{type:Number, required:true},
  miner:{type:String, required:true}
});

export default mongoose.model('owner', owner);
