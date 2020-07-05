import Express from 'express';
import { router as AppRoutes } from './routes/index.js';
import { router as AuthRoutes } from './routes/auth.js';
import { router as AuthAPI } from './apis/auth/auth.js';
import { router as PaymentsAPI } from './apis/payments/stripe.js';
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

// Connect with MongoDB
mongoose.connect(keys.MONGODB.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    app.listen(PORT, console.log(`Server running on port: ${PORT}`));
  })
  .catch(err => console.log(err));