import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const owner = new Schema({
  skully:{type:Number, required:true},
  miner:{type:Schema.ObjectId, required:true}
});

export default mongoose.model('owner', owner);
