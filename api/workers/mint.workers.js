import {Q} from '../Queue';
import Constants from '../constants';
// Run Worker Here!!
Q.process(Constants.jobName.MINT_WORKER, 1 ,async (job,done)=>{
  try {
    console.log(job.data);
    return done(null);
  } catch (err) {
    console.log(err);
    return done(err);
  }
})
//Handling Error
Q.on( 'error', function( err ) {
  console.log( 'Oops... ', err );
});
