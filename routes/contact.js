const express = require('express');
const router = express.Router();
const {createContact, listContacts} = require('../handlers/contact');
const {protect} = require("../middlewares/auth");

router.post('/', protect, createContact);
router.get('/', protect, listContacts);

module.exports = router;