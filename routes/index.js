const express = require('express');
const userRouter = require('./user');
const contactRouter = require('./contact');
const authRouter = require('./auth');

const router = express.Router();

router.use('/user', userRouter);
router.use('/contact',contactRouter);
router.use('/auth', authRouter);

module.exports = router;