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
    console.log(users); //log here in the console all the users
    res.send(users);
  });
});


// 2) to handle adding a user
//When requested by a client, the route needs to take the data supplied by the client and from it create a new user.
app.post('/users', (req, res) => {
  var newUserDB = new User(req.body);
  // this create an _id to the  new user
  newUserDB.save((err, post) => {
    if (err)
      throw err;
    res.send(newUserDB);
  });
});



app.get('/posts', (req, res) => {

    let city =req.query.city;
    let distance =req.query.distance;
    let training =req.query.training; 
    // let findQuery = {};
    // if (req.query.city) {
    //   findQuery.city = req.query.city;
    // }
    // if ( req.query.distance) {
    //   findQuery.distance = req.query.distance;
    // }
    // if ( req.query.training) {
    //   findQuery.training = req.query.training;
    // }

    // // findQuery = { city: "tel aviv", distance: 5 }
    // console.log(findQuery);
    // User.find({ 'posts': { $elemMatch: { 'city': req.query.city, 'trainingType': req.query.training, 'distance': req.query.distance} } }).populate('posts').exec(function (error, posts) {
    User.find().exec(function (error, users) {
    if (error)
      throw error; 
      let postsResult =[];
      for (var i = 0; i < users.length; i++) {
        for (var j= 0; j < users[i].posts.length; j++) {
        // console.log(users[i].posts[j]);
        if((users[i].posts[j].city===city||!city)  &(users[i].posts[j].distance===distance||!distance) &(users[i].posts[j].training===training||!training)){
          postsResult.push(users[i].posts[j]);
        }
        }
      }
     console.log(postsResult); 
    //log here in the console all the users
    res.send(postsResult);
 });
});




//PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));