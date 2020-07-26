import Express from 'express';
import csrf from 'csurf';
import path from 'path';
import authGuard from '../services/auth/authGuard.js';
import keys from '../config/keys.js';

import Room from '../models/Room.js';
import Message from '../models/Message.js';

export const router = Express.Router();

const __dirname = path.resolve();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'home'), {
    activeTab: 'Home',
    csrfToken: req.csrfToken()
  });
});

router.get('/contact', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'contact'), {
    activeTab: 'Contact',
    csrfToken: req.csrfToken()
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'about'), {
    activeTab: 'About',
    csrfToken: req.csrfToken()
  });
});

router.get('/app', authGuard, async (req, res) => {
  const rooms = await Room.find({members: {_id: req.user._id }})
    .populate({ path: 'members', select:'displayName'})
    .populate({ path: 'messages'});
  // const messages = await Message.find({recipient_id: { all room ids??? }})
  res.render(path.join(__dirname, 'views', 'pages', 'app'), {
    activeTab: 'App',
    csrfToken: req.csrfToken(),
    user: req.user,
    stripePublicKey: keys.STRIPE.PUBLIC_KEY,
    rooms: rooms,
  });
});

// 404 Page
router.get('/404', (req, res) => {
  return res.status(404).render(path.join(__dirname, 'views', 'pages', '404'), {
    activeTab: '404',
    csrfToken: req.csrfToken()
  });
});