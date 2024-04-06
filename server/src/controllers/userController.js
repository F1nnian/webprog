const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  return jwt.sign(payload, 'testtest123', { expiresIn: '1h' });
}


async function register(req, res) {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User(req.body);
    newUser.passwordHash = await bcrypt.hash(req.body.password, 10);
    await newUser.save();
    const token = generateToken(newUser);
    console.log("test")
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
  
async function login(req, res){
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { register, login };