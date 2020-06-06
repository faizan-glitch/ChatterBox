import Express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const router = Express.Router();

router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        console.log('This email is already registered.');
        return;
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(user => {
              if (user) {
                console.log(user);
              }
            })
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => console.log(err));
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(res);
  }
);