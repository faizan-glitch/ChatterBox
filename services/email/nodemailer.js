import nodemailer from 'nodemailer';
import keys from '../../config/keys.js';

// Create a transporter for nodemailer
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.NODE_MAILER.GMAIL.email,
    pass: keys.NODE_MAILER.GMAIL.password
  }
});

export const Email = {
  from: keys.NODE_MAILER.GMAIL.email,
  to: '',
  subject: '',
  html: ''
};

