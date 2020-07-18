import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
    enum: ['Room', 'Channel']
  }
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;