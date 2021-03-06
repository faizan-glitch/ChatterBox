import Express from 'express';
import passport from 'passport';
import csrf from 'csurf';

import {
  signupController,
  verifyController,
  logoutController,
  resetController
} from './controllers/authControllers.js'

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.post('/signup', signupController);

router.post('/login',
  passport.authenticate('local', {
    failureFlash: true,
    passReqToCallback: true
  }),
  (req, res) => {
    res.redirect('/app');
  });

router.get('/verify', verifyController);

router.get('/logout', logoutController);

router.post('/reset', resetController.sendEmail);

router.get('/reset/:_token', resetController.verifyToken);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/app');
});