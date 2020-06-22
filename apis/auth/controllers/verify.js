import User from '../../../models/User.js';

const verifyController = (req, res) => {
  User.updateOne(
    { accessToken: req.query._token },
    {
      $set: {
        "verified": "true",
        "verifiedAt": Date.now(),
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
};

export default verifyController;