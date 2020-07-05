import Express from 'express';
import csrf from 'csurf';

import {
  chargeController
} from './controllers/paymentControllers.js';

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.post('/charge', chargeController);