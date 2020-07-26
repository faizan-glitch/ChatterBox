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
  if (!(req.isAuthenticated() && req.user._id == req.body.user._id)) {
    return res.status(403).send();
  }
  const result = await Room.deleteMany({ ownerID: req.user._id });
  res.status(200).send(result);
};

const deleteUserFromRoom = async (req, res) => {  
  if (!(req.isAuthenticated() && req.user._id == req.body.user._id)) {
    return res.status(403).send();
  }
  const result = await Room.findById({ _id: req.body.roomID });
  result.members.pull({ _id: req.body.userID });
  result.save();
  res.status(200).send();
};

export default {
  deleteRoomByID,
  deleteRoomsByUserID,
  deleteUserFromRoom
};