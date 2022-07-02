const express = require('express');
const router = express.Router();
const {create, deleteUser, updateUser, searchUser} = require('../handlers/user');
const {protect} = require('../middlewares/auth');

router.post('/',create);
router.put('/', protect, updateUser);
router.delete('/', protect, deleteUser);
router.get('', searchUser);

module.exports = router;