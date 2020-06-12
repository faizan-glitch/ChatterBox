import nodemailer from 'nodemailer';
import { keys } from '../../config/keys.js';

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.NODE_MAILER.Service.gmail.email,
    pass: keys.NODE_MAILER.Service.gmail.password
  }
})

export default transporter;