import Room from '../../../models/Room.js';

const deleteRoomByID = (req, res) => {
  Room.findOneAndDelete(
    {
      _id: req.params.id,
      ownerID: req.user._id
    }
  )
    .then(_ => { return res.status(200).send(); })
    .catch(err => { return res.status(500).send(); });
  return res.status(403).send();
};

const deleteRoomsByUserID = async (req, res) => {
  const result = await Room.deleteMany({ ownerID: req.user._id });
  res.status(200).send(result);
};

const deleteUserFromRoom = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send();
  }
  const result = await Room.updateOne({ _id: req.body.roomID },
    {
      $pull: {
        members: {
          _id: req.body.userID
        }
      }
    }
  )
  res.status(200).send();
};

export default {
  deleteRoomByID,
  deleteRoomsByUserID,
  deleteUserFromRoom
};