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

// router.get('/user/:id', readController.getmessagesByUserID);

// router.get('/:id', readController.getmessageByID);

// router.post('/name', readController.getmessageByName);

// messages can only be deleted if the req.user.id === ownerID of that message. 
// This route will delete all messages created by the User
// router.delete('/user/:id', deleteController.deletemessagesByUserID);

// router.delete('/leave', deleteController.deleteUserFrommessage);

// router.delete('/:id', deleteController.deletemessageByID);