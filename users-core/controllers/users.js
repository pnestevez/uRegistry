const User = require('../models/User');

const getUsers = (_req, res, next) => {
  User.find()
    .then(data => res.status(200).send(data))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(data => (data
      ? res.status(200).send(data)
      : res.status(404).send({ message: 'Not found' })))
    .catch(err => next(err));
};

const createUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => (user
      ? res.status(409).send({ message: 'Username already in use' })
      : User.create(req.body)
        .then(data => res.status(201).send(data))))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findOne({ userName: req.params.username })
    .then(user => (user
      ? user.update(req.body).then(data => res.send(data))
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
};

const deleteUser = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => (user
      ? user.delete().then(() => res.status(200).send({ message: 'OK' }))
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, updateUser, deleteUser,
};
