import Room from '../../../models/Room.js';


const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
};


const getRoomByID = async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(room);
};

const getRoomsByUserID = async (req, res) => {
  const rooms = await Room.find({ ownerID: req.params.id });
  res.status(200).json(rooms);
};

export default {
  getRoomByID,
  getAllRooms,
  getRoomsByUserID
}