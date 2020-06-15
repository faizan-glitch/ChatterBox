import bcrypt from 'bcrypt';
import User from  '../../../models/User.js'
import { transporter, Email } from '../../../services/email/nodemailer.js';

const verificationURL = "http://localhost:5000/auth/verify/";

const signupController = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        console.log('This email is already registered.');
        return;
      }
      Email.to = req.body.email;

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
                Email.subject = 'Verify your ChatterBox Account';
                Email.html = verificationMessage;
                transporter.sendMail(Email, (err, info) => {
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
};

export default signupController;
