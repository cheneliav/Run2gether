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

// let user = new User({
//   userName:  'tamar' ,
//   password: '11111' ,
//   posts: [{  city: 'Lod',
//     street: 'gordon',
//     trainingType: 'running',
//     distance: '2-5 Km',
//     departureTime: '16:00'}]
// });

// user.save();





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

// 3) to handle adding a post
app.post('/users/:id/posts', (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, { $push: { "posts": req.body } }, { new: true }, (error, user) => {
    if (error) {
      throw error;
    }
    res.send(user);
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
    res.send({ name: req.body.userName, password: req.body.password, phone: req.body.phone});
  }

});



app.get('/posts', (req, res) => {

  let city = req.query.city;
  let distance = req.query.distance;
  let training = req.query.training;

  User.find().exec(function (error, users) {
    if (error)
      throw error;
    let postsResult = [];
    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < users[i].posts.length; j++) {
        // console.log(users[i].posts[j]);
        if ((users[i].posts[j].city === city || !city) & (users[i].posts[j].distance === distance || !distance) & (users[i].posts[j].training === training || !training)) {
          postsResult.push(users[i].posts[j]);
        }
      }
    }
    console.log(postsResult);

    res.send(postsResult);
  });
});

app.get('/users:id', (req, res) => {
  User.findById(req.params.id, function (error, user) {
    if (error)
      throw error;
    res.send(user);
  });
});

app.post('/users/:idOfPost/joinMe', (req, res) => {
  console.log('body:');
  console.log(req.body); 

  User.findByIdAndUpdate(req.params.idOfPost, { $push: { "partners": req.body } }, { new: true }, (error, user) => {
    if (error) {
      throw error;
    }
    res.send(user);
  });
});




//PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));