import bcrypt from 'bcrypt';
import User from '../../../models/User.js'
import { transporter, Email } from '../../../services/email/nodemailer.js';

const verificationURL = "http://localhost:5000/auth/verify/";

const signupController = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(401).json({message: 'This email already exists.'});        
        return;
      }
      Email.to = req.body.email;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          const user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hash,
            accessToken: req.session.id,  // This will later cause a very dangerous bug. Fix it with a JWT
          });
          const verificationMessage = `
                <p>Click this <a href="${verificationURL + '?_token=' + user.accessToken}">Link</a> to verify your account.</p>
                <p>This is an automated email sent by ChatterBox</p>
                <p>Ignore this email if you didn't create an account</p>
              `;
          Email.subject = 'Verify your ChatterBox Account';
          Email.html = verificationMessage;
          Promise.race([user.save(), transporter.sendMail(Email)])
            .then(info => {
              return res.status(201).json({message: 'Success: Now verify your email.'});
            })
            .catch(err => {
              console.log(err);
              return res.status(403).json({message: 'Account Creation Failed'});
            });
        });
      });
    })
    .catch(err => console.log(err));
};

export default signupController;
