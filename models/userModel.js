var mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true }
});


let User = mongoose.model('user', userSchema)

module.exports = User;

