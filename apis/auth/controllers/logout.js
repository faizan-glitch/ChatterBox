import User from '../../../models/User.js';

const logoutController = (req, res) => {
  if (!req.user) {
    return res.status(400).redirect('/');
  }
  req.logout();
  res.status(200).redirect('/');
  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        "signedIn": "false"
      }
    }
  )
    .catch(err => {
      res.status(500).redirect('/');
    });
};

export default logoutController;