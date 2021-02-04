require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line no-unused-vars
const path = require('path');

const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/arkaven', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is conected!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));
