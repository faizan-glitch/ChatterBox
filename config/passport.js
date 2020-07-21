import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import keys from './keys.js';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: keys.GOOGLE.CLIENT_ID,
      clientSecret: keys.GOOGLE.CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
    },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile.emails[0].value })
          .then(currentUser => {
            if (currentUser) {
              return done(null, currentUser)
            }
            else {
              new User({
                displayName: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                verified: true,
                verifiedAt: Date.now(),
                authProvider: profile.provider,
                accessToken: accessToken,
                signedIn: true
              })
                .save()
                .then(newUser => {
                  return done(null, newUser);
                });
            }
          })
      })
  );

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "This email doesn't exist." });
          }
          if (!user.verified) {
            return done(null, false, { message: "Account is not verified." });
          }
          
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                done(null, user);
                user.updateOne(
                  {
                    $set: {
                      signedIn: true
                    }
                  }
                )
              }
              else {
                return done(null, false, { message: 'Password is incorrect.' });
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