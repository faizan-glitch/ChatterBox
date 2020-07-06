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

export default {
  deleteRoomByID,
  deleteRoomsByUserID
};