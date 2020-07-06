import Room from '../../../models/Room.js';

const deleteRoomByID = async (req, res) => { 
  const room = await Room.findById(req.params.id); 
  if (room.ownerID === req.user.id) {
    room.deleteOne()
      .then(response => {
        return res.status(200).send(response);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  }
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