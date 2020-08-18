const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

const error = (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser());
app.use((req, res, next) => {
  req.user = {
    _id: '5f2e84ce98a5bc40ee55d495',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.use(error);

app.listen(3000);
