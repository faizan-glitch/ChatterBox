import User from '../../../models/User.js';

const resetController = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        Email.to = req.body.email,
        Email.subject = 'Reset your account password',
        Email.html = `
        `;
      }
    })
    .catch(err => console.log(err));
};

export default resetController;