import Express from 'express';
import path from 'path';

export const router = Express.Router();

const __dirname = path.resolve();

router.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'home'),{ 
    activeTab: 'Home' 
  });
});

router.get('/contact', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'contact'),{ 
    activeTab: 'Contact' 
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, 'views', 'pages', 'about'),{ 
    activeTab: 'About' 
  });
});



