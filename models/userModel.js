var mongoose = require('mongoose');

//design the two schema below and use sub docs
//to define the relationship between posts and comments


let userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true }
});


let User = mongoose.model('user', userSchema)

module.exports = User;

