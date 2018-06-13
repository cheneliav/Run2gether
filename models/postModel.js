var mongoose = require('mongoose');

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

