import User from '../../../models/User.js';

const logoutController =  (req, res) => {
  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        "signedIn": "false"
      }
    }
  )
    .then(user => {
      if (user) {
        req.logout();
        res.status(200).redirect('/');
      }
    })
    .catch(err => console.log(err));
};

export default logoutController;