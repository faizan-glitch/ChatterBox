import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            console.log('email not registered');
            return done(null, false, { message: 'This email is not registered.' });
          }
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                console.log(user);
                console.log('login successful')
                return done(null, user, { message: 'Login successful.' });
              }
              else {
                console.log(user)
                console.log('password incorrect');
                return done(null, false, { message: 'Password is incorrect. ' });
              }
            });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}