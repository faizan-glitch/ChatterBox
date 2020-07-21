import { transporter, Email } from '../../../services/email/nodemailer.js';
import User from '../../../models/User.js';
import Room from '../../../models/Room.js';

const acceptURL = "http://localhost:5000/invite/accept/";

const sendController = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send();
  }
  Promise.all(
    [
      Room.findOne({ name: req.body.name }),
      User.findOne({ email: req.body.email })
    ]
  )
    .then(response => {      
      const [room, user] = response; 
      if(!(room && user)) {
        return res.status(404).redirect('/app');
      }     
      res.status(200).redirect('/app');
      Email.to = user.email;
      Email.subject = 'Invitation to join Room';
      Email.html = `
      <p>Click this <a href="${acceptURL + '?_room=' + room._id + '&_token=' + user.accessToken} ">Link</a> to accept the invitation.</p>
      <p>This is an automated email sent by ChatterBox</p>
      `;
      return transporter.sendMail(Email);
    });
};

export default sendController;