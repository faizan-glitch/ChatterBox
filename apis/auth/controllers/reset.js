import User from '../../../models/User.js';
import { transporter, Email } from '../../../services/email/nodemailer.js';
import path from 'path';
import csrf from 'csurf';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const csrfProtection = csrf();

const __dirname = path.resolve();

const resetURL = "http://localhost:5000/auth/reset/";

const sendEmail = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        Email.to = req.body.email,
          Email.subject = 'Reset your account password',
          Email.html = `
        <p> Click on this <a href='${resetURL + user.accessToken}'>Link</a> to reset your password.</p>
        <p> Ignore this email if you didn't request a password reset. </p>
        `;
        transporter.sendMail(Email, (err, info) => {
          if (err) {
            console.log(err);
            return res.status(401).send();
          }
          else {
            console.log(info);
            return res.status(200).send();
          }
        });
      }
      else {
        return res.status(404).send();
      }
      console.log('helo world')
    })
    .catch(err => console.log(err));
};

const verifyToken = (req, res) => {
  console.log(req.params._token);
  User.findOne({ accessToken: req.params._token })
    .then(user => {
      if (user) {
        res.status(200).render(path.join(__dirname, 'views', 'pages', 'auth', 'newPassword'), {
          activeTab: 'New Password',
          csrfToken: req.csrfToken(),
          email: user.email
        });
      }
      else {
        res.redirect('/404');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send();
    });
};

const updatePassword = (req, res) => {
  console.log(req.body.newPassword);
  console.log(req.body.email);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
      User.updateOne(
        { email: req.body.email },
        {
          $set: {
            "password": hash,
            "accessToken": uuidv4()
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
  });
};

const resetController = {
  sendEmail,
  verifyToken,
  updatePassword
};

export default resetController;