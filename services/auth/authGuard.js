const authGuard = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(403).redirect('/login');
  }
  else {
    next();
  }
};

export default authGuard;