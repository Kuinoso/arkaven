const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));