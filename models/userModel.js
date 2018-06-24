var mongoose = require('mongoose');

// var postsSchema = require('./postModel') // try to import Post Model

let locationSchema = new mongoose.Schema({
  lat: String,
  lng: String
});

let postSchema = new mongoose.Schema({
  gender: String,
  city: String,
  street: String,
  trainingType: String,
  distance: String,
  departureTime: String,
  idUser: String,
  location: { locationSchema }
});

let userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  posts: [postSchema]
});


let User = mongoose.model('user', userSchema)

module.exports = User;

