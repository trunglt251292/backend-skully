import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Auction = new Schema({
  skullyid:{type:Number, required:true, index:1},
  startingPrice:{type:Number, required:true},
  endingPrice:{type:Number, required:true},
  duration:{type:Number, required:true},
  seller:{type:String,required:true}
});

export default mongoose.model('auction', Auction);
