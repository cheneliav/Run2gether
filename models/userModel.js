var mongoose = require('mongoose');

var postsSchema = require('./postModel') // try to import Post Model

let userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  posts: [postsSchema]
});


let User = mongoose.model('user', userSchema)

module.exports = User;

