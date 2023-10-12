const express = require("express");
const router = express.Router();
const Admin = require('../models/admin')

const scheduledCalls = [];


router.get('/', (req, res) => {
    res.render('home')
});

router.get('/services', (req, res) => {
    res.render('services')
});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/contact', (req, res) => {
    res.render('contact')
});

router.get('/call', (req, res) => {
    res.render('call')
});


router.post('/schedule', (req, res) => {
    const { name, email, phone, date, time } = req.body;
    
    // Create a new scheduled call object
    const newScheduledCall = { name, email, phone, date, time };
    
    // Push it into the array
    scheduledCalls.push(newScheduledCall);
    
    res.render('confirmation', { name, email, phone, date, time });
});






// Admin routes



const { handleadminRegister, handleadminLogin, handleadminDashboard, handleadminLogout } = require('../controllers/admincontroller')




router.get('/admin/signup', (req, res) => {
    res.render('adminsignup')
});

router.post('/admin/signup', handleadminRegister)



 //login

router.get('/admin/login', (req, res) => {
    res.render('adminlogin');
  });
  
  router.post('/admin/login', handleadminLogin ) 

  
 // Dashboard



router.get('/admin/scheduled-calls', (req, res) => {
  // Render a page to display the scheduled calls
  res.render('admin', { scheduledCalls });
});
  
  //logout

  router.get('/admin/logout', (req, res) => {
    res.render('adminlogin');
  });
  
  router.post('/admin/logout', handleadminLogout )



module.exports = router;