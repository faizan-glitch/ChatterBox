import Express from 'express';
import csrf from 'csurf';

import {
  createController,
  readController,
  // deleteController
} from './controllers/messageControllers.js';

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/', readController.getMessagesByRoomID)

router.post('/', createController);