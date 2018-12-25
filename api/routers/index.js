//quan ly routers
import {Router} from 'express';
import RouterExam from './skully.router';
import RouterMiner from './miner.router';

const router = new Router();

router.use('/skullies',RouterExam);
router.use('/miner', RouterMiner);

export default router;
