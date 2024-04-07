const mongoose = require('mongoose');

// Define the pet schema
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    enum: ['dog', 'cat'],
    required: true
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 0 && value <= 25;
      },
      message: props => `${props.value} is not a valid age for a cat or dog.`,
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
    required: true
  },
  image: String,
  availableForAdoption: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  } 
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
