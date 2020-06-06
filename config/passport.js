const LocalStrategy = require('passport-local').Strategy;
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'The email is not registered'});
          }
          


        })
        .catch(err => console.log(err));
    })
  )
}