const jwt = require('jsonwebtoken');
const Card = require('../models/card');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner !== req.user._id) {
        return new Error({ message: 'YOU CANT' });
      }
    });
  next();
};
