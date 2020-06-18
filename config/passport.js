import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import flash from 'connect-flash';

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "This email doesn't exist."});
          }
          if (!user.verified) {
            return done(null, false, { message: "Account is not verified."});
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
                  return done(null, user);
                });
              }
              else {
                return done(null, false, { message: 'Password is incorrect.'});
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