const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const { handleRegister, handleLogin, handleLogout, handleDashboard } = require('../controllers/usercontroller')




router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup', handleRegister)



// //login

router.get('/login', (req, res) => {
    res.render('login');
  });
  
  router.post('/login', handleLogin ) 

  
  
  
  //logout

  router.get('/logout', (req, res) => {
    res.render('login');
  });
  
  router.post('/logout', handleLogout )


// Dashboard
router.get('/dashboard', handleDashboard )


  






module.exports = router;