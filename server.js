const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/runTogetherDB';
mongoose.connect(myConnection, { useMongoClient: true })
  .then(() => { console.log('Successfully connected to mongoDB'); })
  .catch((error) => console.error(error));

// let Post = require('./models/postModel');
let User = require('./models/userModel');

let app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// These define our API:

// 1) to handle getting all users and their posts
app.get('/users', (req, res) => {
  // reads the data of users from the db and send it as a respone to the client
  User.find(function (error, users) {
    if (error)
      throw error;
    // console.log(users); //log here in the console all the users
    res.send(users);
  });
});


// 2) to handle adding a user
//When requested by a client, the route needs to take the data supplied by the client and from it create a new user.
app.post('/users', (req, res) => {
  console.log(req.body);
  var newUserDB = new User(req.body);
  // this save in db and create an _id to the new user
  newUserDB.save((err, post) => {
    if (err)
      throw err;
    res.send(newUserDB);
  });
});


// set users array in req
function userMiddleware(req, res, next) {
  User.find(function (error, users) {
    if (error)
      throw error;
    req.userArray = users;
    next();
  });
};

app.post('/login', userMiddleware, (req, res) => {
  console.log('body:');
  console.log(req.body); // user and password from the login-Form
  console.log(req.userArray); // user array

  //check if user name exists in db
  let pswdFromDB, userId;
  let isExist = false;
  for (let i = 0; i < req.userArray.length; i++) {
    if (req.userArray[i].userName === req.body.userName) {
      isExist = true;
      pswdFromDB = req.userArray[i].password;
      userId = req.userArray[i]._id;
      break;
    }
  }
  console.log(' user name exist : ' + isExist);

  if (!isExist) {
    res.send("userNotExist");
  }
  else { // user name exists
    //password is wrong
    if (req.body.password != pswdFromDB) {
      res.send("passwordWrong");
    }
    else {
      // res.send("allGood");
      res.send({ name: req.body.userName, id: userId });
    }
  }
});

app.post('/signup', userMiddleware, (req, res) => {
  console.log('body:');
  console.log(req.body); // user and passwords from the sigup-Form
  console.log(req.userArray); // user array

  //check if username already exists in db
  let isExist = false;
  for (let i = 0; i < req.userArray.length; i++) {
    if (req.userArray[i].userName === req.body.userName) {
      isExist = true;
      break;
    }
  }
  console.log(' user name exist : ' + isExist);

  if (isExist) {
    res.send("userExist");
  }
  else if (req.body.password != req.body.rePassword) {
      res.send("passwordWrong");
    }
    else {
      // res.send("allGood");
      res.send({ name: req.body.userName, password: req.body.password });
    }

});


//PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));