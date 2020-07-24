import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sender_name: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  recipient_id: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  }
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;