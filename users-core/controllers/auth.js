const jwt = require('jsonwebtoken');
const User = require('../models/User');

const accessTokenSecret = 'tixcodechallenge';

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => (!user
      ? res.status(404).send({ message: 'Not found' })
      : user.hashPassword(password, user.salt).then(hash => {
        if (hash === user.password) {
          res.json({
            accessToken: jwt.sign({ ...user }, accessTokenSecret),
            me: user,
          });
        } else {
          res.status(401).send({ message: 'Unauthorized' });
        }
      })));
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

const getMe = (req, res) => {
  res.send(req.user);
};

module.exports = { login, authenticate, getMe };
