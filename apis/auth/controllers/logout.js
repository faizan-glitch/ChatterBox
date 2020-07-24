import User from '../../../models/User.js';

const logoutController = (req, res) => {
  if (!req.user) {
    return res.status(400).redirect('/');
  }
  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        "signedIn": "false"
      }
    }
  )
    .then(user => {
      req.logout();
      res.status(200).redirect('/');
    })
    .catch(err => {
      res.status(500).redirect('/');
    });
};

export default logoutController;