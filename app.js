const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");


const { userController } = require('./controllers/usercontroller');
const { adminController } = require('./controllers/admincontroller');

const { User } = require('./models/user')
const { Admin } = require('./models/admin')


const mainRouter = require("./routes/main");
const userRouter = require("./routes/user");




const app = express();

//Connect to MongoDB
mongoose.connect('mongodb+srv://Adeoluwa123:09014078564Feranmi@cluster0.r8sg61r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  
//MIDDLEWARES

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(bodyParser.urlencoded ({ extended: false} ));

app.use(
  session({
    secret: 'myappsecret',
    resave: false,
    saveUninitialized: true,
  })
 );


//ROUTES
app.use('/', mainRouter);


app.use('/user', userRouter);


// for dashboard username display
app.get('/user/getUsername', async (req, res) => {
    if (req.session.userId) {
      const user = await User.findOne({ _id: req.session.userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(401).json({ error: 'User not logged in' });
    }
  });
  


//SERVER
const PORT = 3300;
app.listen(PORT,
    console.log(`You are listening to port ${PORT}`));

