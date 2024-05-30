const express = require('express');
const { createSubscription } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/create', auth, createSubscription);

module.exports = router;
