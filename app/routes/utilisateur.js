const express =require('express');
const UserController = require('../controllers/utilisateur')
const router = express.Router();


router.post('/login', UserController.logIn);
router.post('/register', UserController.register);


module.exports = router;
