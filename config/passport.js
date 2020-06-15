import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            console.log('email not registered');
            return done(null, false, { message: 'This email is not registered.', status: 401 });
          }
          if (!user.verified) {
            console.log('User not verified');
            return done(null, false, { message: 'Please verify your email first.', status: 401 });
          }
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                user.updateOne(
                  {
                    $set: {
                      signedIn: true
                    }
                  }
                ).then(response => {
                  return done(null, user, { message: 'Login successful.', status: 200 });
                });
              }
              else {
                console.log('password incorrect');
                return done(null, false, { message: 'Password is incorrect. ', status: 403 });
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