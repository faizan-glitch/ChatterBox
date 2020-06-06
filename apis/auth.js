import Express from 'express';
import {User} from '../models/User.js';
import bcrypt from 'bcrypt';

// TODO Install Passport-local and use it
export const router = Express.Router();

// TODO Create Sign up for Auth API
router.post('/signup', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hash
      });
      user.save()
      .then(user => {
        if(user) {
          console.log(user);
        }
      }) 
      .catch(err => console.log(err));
    });
  });
});

// TODO Create Sign up for Auth API
router.post('/login', (req, res) => {

});
