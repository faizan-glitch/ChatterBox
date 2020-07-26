import Message from '../../../models/Message.js';

const getMessagesByRoomID = async (req, res) => {
  const messages = await message.find({ recipient_id: req.params.id });
  res.status(200).json(messages);
};

export default {
  getMessagesByRoomID
}