const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/exercisetracker';

mongoose.connect(mongoURI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = require('./routes');
app.use('/', routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
