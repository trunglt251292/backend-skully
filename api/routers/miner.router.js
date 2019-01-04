import {Router} from 'express';
import * as Miner_Controller from '../controlls/miner.controller';
const router = new Router();

router.route("/create")
      .post(Miner_Controller.createMiner);
router.route("/getminer")
  .get(Miner_Controller.getMiner);

export default router;
