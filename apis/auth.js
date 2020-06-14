import Express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import csrf from 'csurf';
import { transporter, accountVerificationEmail } from '../services/email/nodemailer.js';

export const router = Express.Router();

const verificationURL = "http://localhost:5000/auth/verify/";

const csrfProtection = csrf();

router.use(csrfProtection);

router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        console.log('This email is already registered.');
        return;
      }
      accountVerificationEmail.to = req.body.email;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hash,
            accessToken: req.session.id
          });
          user.save()
            .then(user => {
              if (user) {
                const verificationMessage = `
                <p>Click this <a href="${verificationURL + '?_token=' + user.accessToken}">Link</a> to verify your account.</p>
                <p>This is an automated email sent by ChatterBox</p>
                <p>Ignore this email if you didn't create an account</p>
              `;
                accountVerificationEmail.html = verificationMessage;
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

router.get('/verify', (req, res) => {
  User.updateOne(
    { accessToken: req.query._token },
    {
      $set: {
        "verified": "true",
        "verifiedAt": Date.now()
      }
    },
  )
    .then(user => {
      console.log(user);
      res.status(200).send('Done');
    })
    .catch(err => {
      console.log(err)
      res.status(401).send('Failed');
    });
});


router.get('/logout', (req, res) => {
  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        "signedIn": "false"
      }
    }
  )
    .then(user => {
      if (user) {
        req.logout();
        res.status(200).redirect('/');
      }
    })
    .catch(err => console.log(err));
});