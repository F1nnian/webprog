const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  passwordHash: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
