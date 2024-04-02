const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/images', express.static('server/resource/images'));

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

mongoose.connect('mongodb://localhost:27017/webprog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const petRoutes = require('./routes/petRoutes');
app.use('/api', petRoutes);