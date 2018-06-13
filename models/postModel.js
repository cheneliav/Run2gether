var mongoose = require('mongoose');

//design the two schema below and use sub docs
//to define the relationship between posts and comments


let postSchema = new mongoose.Schema({
  city: String,
  street: String,
  trainingType: String,
  distance: String,
  departureTime: String,
  idUser: String
});

let Post = mongoose.model('post', postSchema)

module.exports = Post;

