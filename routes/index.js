const express = require('express');
const passport = require('passport');
const router = express.Router();

// Function check auth
function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  return next();
}

// Home page
router.get('/', redirectIfAuthenticated, (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Login Page
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.sendFile('login.html', { root: 'public' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

// LogOut
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Work Page
router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile('dashboard.html', { root: 'public' });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
