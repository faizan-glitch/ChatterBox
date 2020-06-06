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
            done(null, false, {
              message: 'The email is not registered'
            });
          }
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                console.log('login successful')
                done(null, user);
              }
              else {
                console.log('password incorrect');
                done(null, false, {
                  message: 'Password Incorrect'
                });
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
    User.findById(id, (err, done) => {
      done(err, user);
    });
  });
}