import Express from 'express';
import csrf from 'csurf';

import {
  createController,
  readController,
  deleteController
} from './controllers/roomControllers.js';

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/', readController.getAllRooms)

router.post('/', createController);

router.get('/user/:id', readController.getRoomsByUserID);

router.get('/:id', readController.getRoomByID);

router.post('/name', readController.getRoomByName);

// Rooms can only be deleted if the req.user.id === ownerID of that room. 
// This route will delete all rooms created by the User
router.delete('/user/:id', deleteController.deleteRoomsByUserID);

router.delete('/leave', deleteController.deleteUserFromRoom);

router.delete('/:id', deleteController.deleteRoomByID);