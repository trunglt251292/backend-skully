//quan ly routers
import {Router} from 'express';
import RouterExam from './skully.router';

const router = new Router();

router.use('/skullies',RouterExam);

export default router;
