import Express from 'express';
import csrf from 'csurf';

import {
  sendController,
} from './controllers/inviteControllers.js';

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.post('/', sendController);
