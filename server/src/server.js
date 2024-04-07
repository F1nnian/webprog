const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Create an Express app
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(cors()); // Add CORS headers to responses
app.use(morgan('dev')); // Log HTTP requests to the console
app.use('/images', express.static('server/resource/images')); // Serve images

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/webprog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Routes
const petRoutes = require('./routes/petRoutes');
app.use('/api', petRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);