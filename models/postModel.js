var mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
  lat: String,
  lng: String
});

// let userSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   password: { type: String, required: true },
//   posts: [postsSchema]
// });


let postSchema = new mongoose.Schema({
  city: String,
  street: String,
  trainingType: String,
  distance: String,
  departureTime: String,
  idUser: String,
  location: { locationSchema }
});

// let Post = mongoose.model('post', postSchema)

// module.exports = Post;
module.exports = postSchema;

