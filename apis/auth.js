import Express from 'express';
import {User} from '../models/User.js';

// TODO Install Passport-local and use it
export const router = Express.Router();

// TODO Create Sign up for Auth API
router.post('/signup', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save()
    .then(user => {
      if(user) {
        console.log(user);
      }
    }) 
    .catch(err => console.log(err));
    
});

// TODO Create Sign up for Auth API
router.post('/login', (req, res) => {

});
