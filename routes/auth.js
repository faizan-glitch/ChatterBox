import Express from 'express';
import csrf from 'csurf';
import path from 'path';

const __dirname = path.resolve();

export const router = Express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/login', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'auth', 'login'), {
    activeTab: 'Login',
    csrfToken: req.csrfToken(),
    message: req.flash().error
  });
});

router.get('/signup', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'auth', 'signup'), {
    activeTab: 'Signup',
    csrfToken: req.csrfToken()
  });
});

router.get('/reset', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'auth', 'reset'), {
    activeTab: 'Reset',
    csrfToken: req.csrfToken()
  });
});
