import Express from 'express';
import csrf from 'csurf';

import {
  createController,
  readController
} from './controllers/roomControllers.js';

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/', readController.getAllRooms)

router.post('/', createController);

router.get('/user/:id', readController.getRoomsByUserID);

router.get('/:id', readController.getRoomByID);

