import User from '../../../models/User.js';
import Room from '../../../models/Room.js';

const acceptController = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send();
  };
  Promise.all(
    [
      Room.findById(req.query._room),
      User.findOne({ accessToken: req.query._token })
    ]
  )
    .then(response => {
      const [room, user] = response;
      if (!(room && user)) {
        return res.status(404).send();
      }
      // Add the User to that particular Room
      room.members.push({ _id: user._id })
      room.save()
        .then(room => {
          return res.status(200).send('Done');
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send();
        });
    });
};

export default acceptController;