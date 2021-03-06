import Express from 'express';
import { router as AppRoutes } from './routes/index.js';
import { router as AuthRoutes } from './routes/auth.js';
import { router as AuthAPI } from './apis/auth/auth.js';
import { router as PaymentsAPI } from './apis/payments/stripe.js';
import { router as RoomAPI } from './apis/room/room.js';
import { router as MessageAPI } from './apis/message/message.js';
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
import Message from './models/Message.js';
import Room from './models/Room.js';
import Schema from 'mongoose';

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

// Use Message API
app.use('/message', MessageAPI);

// Use Invite API
app.use('/invite', InviteAPI);

// Any other page will get redirected to 404
app.get('**', (req, res) => {
  res.redirect('/404');
});

// Setup Socket.io
const server = http.createServer(app);
const socketIO = io(server);


//When client connects
socketIO.on('connection', (socket) => {
  console.log("A user connected");

  socket.emit('message', {user: 'Bot' , message: 'Welcome to ChatterBox' , time: Date.now() , room: 'myChatroom'});

  //Broadcast to all users about this user's connection.
  socket.broadcast.emit('message',  {user: 'Bot' , message: 'A user has joined this Chat' , time: Date.now() , room: 'General'});

  //when a user disconnects
  socket.on('disc', (data) =>{
    socketIO.emit('message', {username: 'ChatterBot' , message: `${data.username} has left this room` , time: Date.now() , roomname: data.roomname})
  });

  //recieve chat message
  socket.on('chatmsg', data => {
    if(data === '') {
      return;
    }
    socketIO.emit('message', data);
    const message = new Message({
      sender_id: Schema.Types.ObjectId(data.user),
      sender_name: data.username,
      data: data.message,
      recipient_id: Schema.Types.ObjectId(data.roomID)
    });
    message.save()
    .then(msg =>{
      Room.findById(data.roomID)
      .then(room => {
        room.messages.push(Schema.Types.ObjectId(msg._id));
        room.save();
      })
    })
    .catch(err => console.log(err));
  });
});

// Connect with MongoDB
mongoose.connect(keys.MONGODB.URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(res => {
    server.listen(PORT, console.log(`Server running on port: ${PORT}`));
  })
  .catch(err => console.log(err));