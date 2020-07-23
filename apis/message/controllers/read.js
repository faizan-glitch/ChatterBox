import message from '../../../models/message.js';


// const getAllmessages = async (req, res) => {
//   const messages = await message.find();
//   res.status(200).json(messages);
// };


// const getmessageByID = async (req, res) => {
//   const message = await message.find(req.params.id);
//   res.status(200).json(message);
// };

// const getmessageByName = async (req, res) => {
//   console.log(req.body.name);
  
//   const message = await message.findOne({ name: req.body.name });
//   res.status(200).json(message);
// };

const getMessagesByRoomID = async (req, res) => {
  const messages = await message.find({ recipient_id: req.params.id });
  res.status(200).json(messages);
};

export default {
  // getmessageByID,
  // getAllmessages,
  // getmessageByName,
  getMessagesByRoomID
}