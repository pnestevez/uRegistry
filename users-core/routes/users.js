const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:username', getUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

module.exports = router;
