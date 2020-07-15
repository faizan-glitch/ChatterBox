import Express from 'express';
import { router as AppRoutes } from './routes/index.js';
import { router as AuthRoutes } from './routes/auth.js';
import { router as AuthAPI } from './apis/auth/auth.js';
import { router as PaymentsAPI } from './apis/payments/stripe.js';
import { router as RoomAPI } from './apis/room/room.js';
import { router as InviteAPI } from './apis/invite/invite.js'; 
import keys from './config/keys.js';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import passportConfig from './config/passport.js'
import helmet from 'helmet';
import flash from 'connect-flash';
import http from 'http';
import io from 'socket.io';

dotenv.config();

// Passport Config
passportConfig(passport);

const app = Express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Use the logger in dev enviroment
if (process.env.NODE_ENV == 'development') {
  app.use(logger('tiny'));
}

// Use Helmet Protection
app.use(helmet());

// Set Static Folders
app.use(Express.static(path.join(__dirname, 'public')));
app.use(Express.static(path.join(__dirname, 'vendors')));
app.use(Express.static(path.join(__dirname, 'node_modules')));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use(session({
  secret: keys.SessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// Use Passport
app.use(passport.initialize());
app.use(passport.session());

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set Routes
app.use(AppRoutes);
app.use(AuthRoutes);

// Use Auth API
app.use('/auth', AuthAPI);

// Use Payments API
app.use('/payments', PaymentsAPI);

// Use Room API
app.use('/room', RoomAPI);

// Use Invite API
app.use('/invite', InviteAPI);

// 404 Page
app.get('/404', (req, res) => {
  return res.status(404).render(path.join(__dirname, 'views', 'pages', '404'), {
    activeTab: '404',
    csrfToken: req.csrfToken()
  });
});

app.get('**', (req, res) => {
  res.redirect('/404');
});

// Setup Socket.io
const server = http.createServer(app);
const socketIO = io(server);

//When client connects
socketIO.on('connection', (socket) => {
  console.log("A user connected");

  socket.emit('message', 'Welcome to ChatterBox');

  //Broadcast to all users about this user's connection.
  socket.broadcast.emit('message', 'A user has joined this Chat');

  //when a user disconnects
  socket.on('disconnect', () =>{
    socketIO.emit('message', 'A user has left this chat')
  });

  //recieve chat message
  socket.on('chatmsg', message => {
    socketIO.emit('message', message);
  });

});

// Connect with MongoDB
mongoose.connect(keys.MONGODB.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    server.listen(PORT, console.log(`Server running on port: ${PORT}`));
  })
  .catch(err => console.log(err));