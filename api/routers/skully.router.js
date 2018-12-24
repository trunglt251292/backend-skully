import {Router} from 'express';
import * as Skullies from "../controlls/skullies.controller";
import {multipleUploadAvatar} from '../controlls/upload.controller';
const router = new Router();


router.route('/buy')
      .post(Skullies.setSkullies);
router.route('/:id')
      .get(Skullies.getSkulliesById)
      .post(Skullies.setPrice);
router.route('/skullies')
      .get(Skullies.getAllSkullies);

export default router;
