import Express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import path from 'path'
import keys from '../config/keys.js';
import transporter from '../services/email/nodemailer.js';

const __dirname = path.resolve

export const router = Express.Router();

router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        console.log('This email is already registered.');
        return;
      }

      const accountVerificationEmail = {
        from: keys.NODE_MAILER.Service.gmail.email, 
        to: req.body.email, 
        subject: 'Verify Account', 
        html: '<p>This is a test email here</p>'
      };

      transporter.sendMail(accountVerificationEmail, (err, info) => {
        if (err) {
          console.log("This is err");
          console.log(err);
        }
        else {
          console.log("This is info");
          console.log(info);
        }
      });

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
  passport.authenticate('local'),
  (req, res) => {
    res.redirect('/app');
  });
