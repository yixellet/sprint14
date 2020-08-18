const User = require('../models/user');

function error(res) {
  res.status(404).send({ message: 'Пользователя с таким ID не существует' });
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        error(res);
      }
    })
    .catch(() => error(res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  User.findByIdAndUpdate(req.user._id,
    { name: newName, about: newAbout },
    { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        error(res);
      }
    })
    .catch(() => error(res));
};

module.exports.updateAvatar = (req, res) => {
  const newAvatar = req.body.avatar;
  User.findByIdAndUpdate(req.user._id,
    { avatar: newAvatar },
    { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        error(res);
      }
    })
    .catch(() => error(res));
};
