import {Q} from '../Queue';
import Constants from '../constants';
// Run Worker Here!!
Q.process(Constants.jobName.EXAM_WORKER, 1 ,async (data,done)=>{
  try {
    // Code o chuc nang o day!
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
