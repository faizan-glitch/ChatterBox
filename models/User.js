import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: {
    type: String,
    default: 'John Doe', 
  },
  email: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now() 
  },
  verified: {
    type: Boolean,
    default: false, 
  },
  verifiedAt: {
    type: Date,
    default: null, 
  },
  signedIn: {
    type: Boolean,
    default: false, 
  },
  authProvider: {
    type: String,
    default: 'email/password' 
  }
});

export const User = mongoose.model('User', userSchema);