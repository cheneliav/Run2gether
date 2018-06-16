const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/runTogetherDB';
mongoose.connect(myConnection, { useMongoClient: true })
  .then(() => {console.log('Successfully connected to mongoDB');})
  .catch((error) => console.error(error));

let Post = require('./models/postModel');
let User = require('./models/userModel');

let app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// These define our API:

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
  // reads the data of posts from the db and send it as a respone to the client
  Post.find(function (error, posts) {
    if (error)
      throw error;
    console.log(posts); //log here in the console all the posts
    res.send(posts);
  });
});

// 2) to handle adding a post
//When requested by a client, the route needs to take the data supplied by the client and from it create a new post.
app.post('/users', (req, res) => {
  var newUserDB = new Post(req.body);
  // this create an _id to the  new user
  newUserDB.save((err, post) => {
    if (err)
      throw err;
    res.send(newUserDB);
  });
});


//PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));