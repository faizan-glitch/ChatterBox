import Express from 'express';
import csrf from 'csurf';
import Room from '../../models/Room.js';

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.post('/', (req, res) => {
  console.log(req.body);
  const newRoom = new Room({
    name: req.body.name,
    accessType: req.body.accessType,
    ownerID: req.user._id,
    password: req.body.password,
    ageRestricted: req.body.ageRestricted ? true: false,
  });
  newRoom.save()
    .then(room => {
      console.log(room);
    })
    .catch(err => console.log(err)
    )
});
