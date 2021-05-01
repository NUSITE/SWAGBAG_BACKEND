const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

router.post('/signup',userController.signup);
router.get('/getUsers', userController.getUsers);

module.exports = router;