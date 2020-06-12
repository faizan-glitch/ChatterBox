import nodemailer from 'nodemailer';
import keys from '../../config/keys.js';

// Create a transporter for nodemailer
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.NODE_MAILER.Service.gmail.email,
    pass: keys.NODE_MAILER.Service.gmail.password
  }
});

export const accountVerificationEmail = {
  from: keys.NODE_MAILER.Service.gmail.email,
  to: '',
  subject: 'Verify Account',
  html: ''
};
