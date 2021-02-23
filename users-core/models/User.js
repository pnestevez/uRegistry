const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});

userSchema.post('validate', async (doc) => {
  await bcrypt
    .genSalt(16)
    .then(salt => (doc.salt = salt))
    .then(() => doc.hashPassword(doc.password, doc.salt))
    .then(hash => (doc.password = hash));
});

userSchema.methods.hashPassword = async (pass, salt) => await bcrypt.hash(pass, salt);

const User = mongoose.model('Users', userSchema);

module.exports = User;
