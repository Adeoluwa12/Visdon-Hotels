const bcrypt = require('bcryptjs');
const { Admin } = require('../models/admin');


async function handleadminRegister (req, res) {
  const { username, email, password } = req.body;
  

   try {
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        await Admin.create ({
          username,
          email,
          password: hashedPassword,
        });

        
  
        res.redirect('/admin/login');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    }



    async function handleadminLogin(req, res) {
      const { username, password } = req.body;
    
      const admin = await Admin.findOne({ username });
      console.log('Admin', admin);
    
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.render('adminlogin', {
          error: 'Invalid username or password',
        });
      } else {
        req.session.adminId = admin._id; // Store the correct _id of the found user
        return res.redirect('/admin/scheduled-calls');
      }
    };


    async function handleadminLogout(req, res) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Server Error');
        } else {
          res.redirect('/admin/login');
        }
      });
    }


    
    async function handleadminDashboard(req, res) {
      try {
        if (req.session.adminId) {
          // Assuming you have access to the user object with the username
          const admin = await Admin.findOne({ _id: req.session.adminId });
          if (!admin) {
            // Handle the case where the user is not found or not logged in properly
            return res.redirect('/admin/login');
          }
          res.render('admin', { loggedIn: true, username: admin.username });
        } else {
          res.redirect('/admin/login');
        }
      } catch (error) {
        console.error('Error handling dashboard:', error);
        res.status(500).send('Server Error');
      }
   }
        




          

    module.exports = {
      handleadminRegister, handleadminLogin, handleadminLogout, handleadminDashboard
    }













