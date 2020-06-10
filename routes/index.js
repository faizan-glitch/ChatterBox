import Express from 'express';
import csrf from 'csurf';
import path from 'path';

export const router = Express.Router();

const __dirname = path.resolve();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'home'),{ 
    activeTab: 'Home',
    csrfToken: req.csrfToken() 
  });
});

router.get('/contact', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'contact'),{ 
    activeTab: 'Contact',
    csrfToken: req.csrfToken() 
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'about'),{ 
    activeTab: 'About',
    csrfToken: req.csrfToken() 
  });
});

router.get('/app', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'app'),{ 
    activeTab: 'App',
    csrfToken: req.csrfToken() 
  });
});



router.post('/test', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'test'));
});



