import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  accessType: {
    type: String,
    required: true
  },
  ownerID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ageRestricted: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  description: {
    type: String,
    required: true
  }
});

const Room = mongoose.model('Room', RoomSchema);
export default Room;