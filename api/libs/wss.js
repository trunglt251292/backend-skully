import Web3 from 'web3';
import globalConstant from '../constants';
import {Q} from '../Queue';
const socket = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/b3bb2420beaf42ba92bfd850ba3f1905'));
export const socket_contract = new socket.eth.Contract([{"constant":false,"inputs":[{"name":"_c","type":"uint256"}],"name":"change","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"c","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_c","type":"uint256"}],"name":"Change","type":"event"}], '0xc11d0150aa4cd5c9a3f52acd616f13df1f391b7b');

// socket_contract.once('Change',{fromBlock:0,toBlock:'latest'},function (err,event) {
//   if(err){
//     console.log('error : ',err);
//   }else {
//     console.log('Event : ',event);
//   }
// });

socket_contract.events.allEvents({fromBlock:0,toBlock:'latest'}, function (error,events) {
  if(error){
    console.log(error);
  }else {
    switch (events.event){
      case 'Change':
        Q.create(globalConstant.jobName.MINT_WORKER,events).removeOnComplete(true).save();
        break;
      default:
        break;
    }
  }
});
