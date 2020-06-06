import Express from 'express';
import { router as AppRoutes } from './routes/index.js';
import { router as AuthRoutes } from './routes/auth.js';
import { router as AuthAPI } from './apis/auth.js';
import { keys } from './config/keys.js';
import session from 'express-session'; 
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
// import csrf from 'csurf';

dotenv.config();

const app = Express();
const __dirname = path.resolve();
// const csrfProtection = csrf();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'dev') {
  // app.use(logger('tiny'));
}

// Set Static Folders
app.use(Express.static(path.join(__dirname, 'public')));
app.use(Express.static(path.join(__dirname, 'vendors')));
app.use(Express.static(path.join(__dirname, 'node_modules')));

app.use(session({
  secret: keys.SessionSecret,
  resave: false,
  saveUninitialized: false
}));

// Parse application/json
app.use(bodyParser.json());

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set Routes
app.use(AppRoutes);
app.use(AuthRoutes);

// app.use()

// Use Auth API
app.use('/auth', AuthAPI);

// Connect with MongoDB
mongoose.connect(keys.MONGODB.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    app.listen(PORT, console.log(`Server running on port: ${PORT}`));
  })
  .catch(err => console.log(err));