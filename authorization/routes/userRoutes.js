const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/sign_up', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.get('/me', authController.me);


module.exports = router;
