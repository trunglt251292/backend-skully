import {Router} from 'express';
import * as Skullies from "../controlls/skullies.controller";
const router = new Router();

router.route('/getall')
      .get(Skullies.getAllSkullies);
router.route('/getSkully')
      .get(Skullies.getSkullyOfOwner);
router.route('/:id')
      .get(Skullies.getSkulliesById);

export default router;
