const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link, { protocols: ['http', 'https'], require_protocol: true, require_host: true });
      },
      message: (props) => `${props.value} неверный URL`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
