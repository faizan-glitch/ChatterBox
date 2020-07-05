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
  }

});

const Room = mongoose.model('Room', RoomSchema);
export default Room;